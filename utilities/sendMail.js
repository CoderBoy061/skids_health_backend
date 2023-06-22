const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
const path = require("path");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
});
const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve("./views"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));
exports.sendMail = async (email, otp) => {
  transporter.sendMail(
    {
      from: process.env.SMTP_FROM,
      replyTo: process.env.SMTP_FROM,
      to: email,
      subject:
        "To authenticate, please use the following One Time Password (OTP):",
      template: "emailTemplate",

      context: {
        otp: otp,
      },
    },
    (err) => {
      if (err) console.log(err);
      else console.log("Mail sent successfully");
    }
  );
};
