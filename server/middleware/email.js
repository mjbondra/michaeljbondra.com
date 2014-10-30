var nodemailer = require('nodemailer')
  , transporter = nodemailer.createTransport(require('nodemailer-sendmail-transport')());

/**
 * Mail Middleware
 *
 * - use before middleware that sends mail
 * - populate this.email with email params (from, to, subject, and text)
 */
module.exports = function *(next) {
  this.email = {};
  yield next;
  transporter.sendMail(this.email);
  delete this.email;
};
