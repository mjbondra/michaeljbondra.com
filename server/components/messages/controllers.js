var coBody = require('co-body')
  , mongoose = require('mongoose')
  , msg = require('../../../shared/messages').crud
  , Bluebird = require('bluebird');

var Message = mongoose.model('Message');

exports.create = function *() {
  var message = new Message(yield coBody(this));
  message.ip = this.ip;
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
    msg: msg.message.created(message.name),
    status: this.status
  };
};
