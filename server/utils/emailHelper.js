// const nodemailer = require("nodemailer");
// const fs = require("fs");
// const dotenv = require("dotenv");
// const path = require("path");
// dotenv.config();
// const { SENDGRID_API_KEY } = process.env;
// function replaceContent(content, creds) {
// let allkeysArr = Object.keys(creds);
// allkeysArr.forEach(function (key) {
// content = content.replace(`#{${key}}`, creds[key]);
// });
// return content;
// }
// async function EmailHelper(templateName, reciverEmail, creds) {
// // console.log(templateName, reciverEmail, creds)
// try {
// const templatePath = path.join(__dirname, "email_templates", templateName);
// let content = await fs.promises.readFile(templatePath, "utf-8");
// const emailDetails = {
// to: reciverEmail,
// from: "mrinal.bhattacharya@scaler.com", // Change to your verified sender
// subject: "Mail from ScalerShows",
// text: `Hi ${creds.name} this your reset otp ${creds.otp}`,
// html: replaceContent(content, creds),
// };
// const transportDetails = {
// host: "smtp.sendgrid.net",
// port: 587,
// auth: {
// user: "apikey",
// pass: SENDGRID_API_KEY,
// },
// };
// const transporter = nodemailer.createTransport(transportDetails);
// await transporter.sendMail(emailDetails);
// console.log("email sent");
// } catch (err) {
// console.log(err);
// }
// }
// module.exports = EmailHelper;

const nodemailer = require("nodemailer");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();
const { SENDGRID_API_KEY } = process.env;

function replaceContent(content, creds) {
  let allKeys = Object.keys(creds);
  allKeys.forEach((key) => {
    content = content.replace(`#{${key}}`, creds[key]);
  });
  return content;
}

async function EmailHelper(templateName, receiverEmail, creds) {
  try {
    const templatePath = path.join(__dirname, "email_templates", templateName);
    let content = await fs.promises.readFile(templatePath, "utf-8");

    const emailDetails = {
      to: receiverEmail,
      from: "ashwini0820@gmail.com", // ✅ Verified sender
      subject: "BookMyShow OTP",
      text: `Hi ${creds.name}, your OTP is ${creds.otp}`,
      html: replaceContent(content, creds),
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.sendgrid.net",
      port: 587,
      auth: {
        user: "apikey",           // must be literally "apikey"
        pass: SENDGRID_API_KEY,   // your SendGrid API key
      },
    });

    await transporter.sendMail(emailDetails);
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Email sending error:", err);
  }
}

module.exports = EmailHelper;
