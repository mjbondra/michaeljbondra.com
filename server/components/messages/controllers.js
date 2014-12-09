var coBody = require('co-body')
  , mongoose = require('mongoose')
  , Bluebird = require('bluebird');

var Message = mongoose.model('Message');

exports.create = function *() {
  var message = new Message(yield coBody(this));
  yield Bluebird.promisify(message.save, message)();
  this.email = {
    from: 'Michael J. Bondra <inquiries@mjbondra.com>',
    to: 'Michael J. Bondra <inquiries@mjbondra.com>',
    subject: 'Inquiry from mjbondra.com',
    text: message.body
  };
  if (message.email) this.email.replyTo = message.name ?
    message.name + ' <' + message.email + '>' :
    message.email;
  this.status = 201; // 201 Created
  this.body = {
    msg: 'Message received.',
    status: this.status
  };
};
