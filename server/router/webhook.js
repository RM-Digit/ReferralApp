const Router = require("koa-router");
const product = require("../../models/productModel");
const customerModel = require("../../models/customerModel");
const router = new Router({
  prefix: "/webhook",
});
var webhook_created = false;
var link = "";
function register(app) {
  router.post("/order-payment", async (ctx) => {
    webhook_created = true;
    const data = ctx.request.body;
    console.log("webhook received", data);
    const referral_link = await generate_referral_link(data.customer.id);
    link = referral_link;
    const customerData = {
      id: data.customer.id,
      email: data.customer.email,
      name: data.customer.first_name + " " + data.customer.last_name,
      referringSite: data.customer.referring_site,
      landingSite: data.customer.landing_site,
      referralLink: referral_link,
    };
    const customer = new customerModel(customerData);
    customer.save();

    ctx.body = data;
  });
  router.post("/check", async (ctx) => {
    if (webhook_created) {
      webhook_created = false;
      ctx.body = { webhook_created: true, referralLink: link };
    } else ctx.body = { webhook_created: false };
  });
  async function generate_referral_link(id) {
    const savedProduct = await product.find({});
    const permalink = savedProduct[0].permalink;
    return permalink + "?referrer=" + id;
  }
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
