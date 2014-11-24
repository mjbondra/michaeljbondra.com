var nodemailer = require('nodemailer')
  , sendmail = require('nodemailer-sendmail-transport')
  , transporter = nodemailer.createTransport(sendmail());

/**
* Mail Middleware
*
* - use before middleware that sends mail
* - populate this.email with email params (from, to, subject, and text)
*/
exports.email = function *(next) {
  this.email = {};
  yield next;
  transporter.sendMail(this.email);
  delete this.email;
};
