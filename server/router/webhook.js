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

async function updateCustomer(referId, name) {
  console.log("name", name);
  await customerModel.findOneAndUpdate(
    { id: referId },
    {
      $inc: { score: 1 },
    }
  );
  await customerModel.findOneAndUpdate(
    { id: referId },
    {
      referredTo: name,
    }
  );
  const referrer = await customerModel.findOne({ id: referId });
  return referrer ? referrer.name : "";
}

function register(app) {
  router.post("/order-payment", async (ctx) => {
    webhook_created = true;
    const data = ctx.request.body;
    const isReferred = data.landing_site_ref ? true : false;
    const email = data.customer.email ? data.customer.email : data.email;
    const name = data.customer.first_name + " " + data.customer.last_name;
    console.log("webhook received", data);
    link = await generate_referral_link(data.customer.id);
    const referrName = isReferred
      ? await updateCustomer(data.landing_site_ref, name)
      : "";
    const customerData = {
      id: data.customer.id,
      email: email,
      name: name,
      landingSite: data.landing_site,
      referredBy: referrName,
      referralLink: link,
      browserIp: data.browser_ip,
    };
    const findCustomer = await customerModel.findOne({ id: data.customer.id });
    if (findCustomer.id) {
      const customer = new customerModel(customerData);
      customer.save();
    } else {
      customerModel.findOneAndUpdate({ id: data.customer.id }, customerData, {
        new: true,
        upsert: true, // Make this update into an upsert
      });
    }
    createMailer(email, timeout, name);
    ctx.body = true;
  });

  async function createMailer(email, timeout, recepName) {
    const text = await klaviyoMailer.getTemplate();
    const emailContents = text.data.filter((obj) => obj.id === "T9cZic");
    const splitText = "{{ sharelink }}";
    link =
      "https://www.skullsplitterdice.com/products/30-sided-polyhedral-dice-d30-32mm-solid-orange-color-1-each?ref=3507195052092";
    var html = emailContents[0].html.replace(splitText, link);
    const createdId = await klaviyoMailer.createTemplate(html);
    setTimeout(() => {
      klaviyoMailer.sendEmail(email, recepName, createdId.id);
    }, timeout);
    setTimeout(() => {
      klaviyoMailer.deleteTemplate(createdId.id);
    }, timeout + 60000);
  }

  async function generate_referral_link(id) {
    const sharelinks = await share.find({});
    const permalink = sharelinks[0].shareLink;
    return permalink + "?ref=" + id;
  }
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
