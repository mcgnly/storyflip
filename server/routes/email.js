"use strict";
const nodemailer = require("nodemailer");
const EMAIL = require('../constants/email');

// async..await is not allowed in global scope, must use a wrapper
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL.user,
    pass: EMAIL.pass
  }
});

async function sendNotificationEmail(orderId){
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"storyflip" <katie@storyflip.me>', // sender address
    to: "katherine.mcginley@gmail.com", // list of receivers
    subject: "someone just uploaded a PDF", // Subject line
    text: `Go check for order ${orderId}`, // plain text body
  });
}
async function sendNotificationEmail(){
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"storyflip" <katie@storyflip.me>', // sender address
    to: "katherine.mcginley@gmail.com", // list of receivers
    subject: "someone just did a free flipbook", // Subject line
    text: `yeah! someone used the thing!`, // plain text body
  });
}

module.exports = {sendNotificationEmail, sendFreeDownloadEmail};
