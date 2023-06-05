var nodemailer = require("nodemailer");

async function sendMail(email, message, subject) {
  // create reusable transporter object using the default SMTP transport

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "eatfresh251@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "EAT FRESH , eatfresh251@gmail.com", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: "Some message", // plain text body
    html: message, // html body
  });
  console.log("Message sent: %s", info.messageId);
  console.log(await info, "info");
  return await info;
}

module.exports.sendMail = sendMail;
