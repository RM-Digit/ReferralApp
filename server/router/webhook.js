const Router = require("koa-router");
const product = require("../../models/productModel");
const customerModel = require("../../models/customerModel");
const share = require("../../models/shareModel");
const nodeMailer = require("../../services/nodeMailerEmailService");
const klaviyoMailer = require("../../services/klaviyoEmailService");

const router = new Router({
  prefix: "/webhook",
});

var webhook_created = false;
var link = "";
const timeout = 60 * 1000;

function register(app) {
  router.post("/order-payment", async (ctx) => {
    webhook_created = true;
    const data = ctx.request.body;
    const email = data.customer.email ? data.customer.email : data.email;
    console.log("webhook received", data);
    link = await generate_referral_link(data.customer.id);

    const customerData = {
      id: data.customer.id,
      email: email,
      name: data.customer.first_name + " " + data.customer.last_name,
      referringSite: data.customer.referring_site,
      landingSite: data.customer.landing_site,
      referralLink: link,
    };
    const customer = new customerModel(customerData);
    customer.save();
    createMailer(email, timeout, data.customer.first_name);
    ctx.body = true;
  });

  // payment check
  router.post("/check", async (ctx) => {
    if (webhook_created) {
      webhook_created = false;
      ctx.body = { webhook_created: true, referralLink: link };
    } else ctx.body = { webhook_created: false };
  });

  async function createMailer(email, timeout, fName) {
    const text = await klaviyoMailer.getTemplate();
    link =
      "https://www.skullsplitterdice.com/products/dwarven-chest-antique-brass/?referrer=3507195052092";
    const emailContents = text.data.filter((obj) => obj.id === "UfPa68");
    const splitText = "{{ ShareLink }}";
    const firstName = "{{ first_name }}";
    var html = emailContents[0].html.replace(splitText, link);
    html = html.replace(firstName, fName);
    setTimeout(() => {
      const mailOptions = {
        to: email,
        from: "rissatk08@gmail.com",
        subject: "SkullSplitter",
        html: html,
      };
      nodeMailer.sendEmail(mailOptions);
    }, timeout);
  }

  async function generate_referral_link(id) {
    const sharelinks = await share.find({});
    const permalink = sharelinks[0].shareLink;
    return permalink + "?referrer=" + id;
  }
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
