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
  customerModel.findOneAndUpdate(
    { id: referId },
    {
      $inc: { score: 1 },
    }
  );
  customerModel.findOneAndUpdate(
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
    customerModel.findOneAndUpdate({ id: data.customer.id }, customerData, {
      new: true,
      upsert: true, // Make this update into an upsert
    });

    createMailer(email, timeout, name);
    ctx.body = true;
  });

  // payment check
  router.post("/check", async (ctx) => {
    if (webhook_created) {
      webhook_created = false;
      ctx.body = { webhook_created: true, referralLink: link };
    } else ctx.body = { webhook_created: false };
  });

  async function createMailer(email, timeout, recepName) {
    setTimeout(() => {
      klaviyoMailer.sendEmail(email, recepName);
    }, timeout);
  }
  // async function createMailer(email, timeout, fName) {
  //   const text = await klaviyoMailer.getTemplate();
  //   const emailContents = text.data.filter((obj) => obj.id === "T9cZic");
  //   const splitText = "{{ ShareLink }}";
  //   const firstName = "{{ first_name }}";
  //   var html = emailContents[0].html.replace(splitText, link);
  //   html = html.replace(firstName, fName);
  //   setTimeout(() => {
  //     const mailOptions = {
  //       to: email,
  //       from: "rissatk08@gmail.com",
  //       subject: "SkullSplitter",
  //       html: html,
  //     };
  //     nodeMailer.sendEmail(mailOptions);
  //   }, timeout);
  // }

  async function generate_referral_link(id) {
    const sharelinks = await share.find({});
    const permalink = sharelinks[0].shareLink;
    return permalink + "?ref=" + id;
  }
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
