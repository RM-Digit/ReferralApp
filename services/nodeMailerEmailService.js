const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  //   service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "rissatk08@gmail.com",
    pass: "mdefkfboxdubuhsm",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
const sender = {
  sendEmail,
};
module.exports = sender;
