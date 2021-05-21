const klaviyoMailer = require("../../services/klaviyoEmailService");
const nodeMailer = require("../../services/nodeMailerEmailService");
const Router = require("koa-router");
const product = require("../../models/productModel");
const customerModel = require("../../models/customerModel");
const router = new Router({
  prefix: "/mailer",
});

function register(app) {
  // Klaviyo Mailer
  router.post("/send", async (ctx) => {
    const data = await klaviyoMailer.sendEmail();
    console.log("data", data);
    ctx.body = { success: data };
  });
  // Nodemailer
  // router.post("/send", async (ctx) => {
  //   const mailOptions = {
  //     to: "email",
  //     from: "SkullSplitter",
  //     subject: "Password change request",
  //     text: `Hi  \n
  //   Please click on the following link ${link} to reset your password. \n\n
  //   If you did not request this, please ignore this email and your password will remain unchanged.\n`,
  //   };
  //   nodeMailer.sendEmail(mailOptions);

  //   ctx.body = { success: true };
  // });
  app.use(router.routes());
  app.use(router.allowedMethods());
}

module.exports = register;
