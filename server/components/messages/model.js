var mongoose = require('mongoose')
  , msg = require('../../../shared/messages').validation
  , Schema = mongoose.Schema
  , validate = require('validator');

var MessageSchema = new Schema({
  body: {
    default: '',
    type: String
  },
  email: String,
  name: String,
  ip: String
});

MessageSchema.pre('validate', function (next) {
  validate.escape(this.body);
  if (this.email) validate.escape(this.email);
  if (this.name) validate.escape(this.name);
  next();
});

MessageSchema.path('body').validate(function (body) {
  return body.length;
}, msg.message.body.required);

MessageSchema.path('email').validate(function (email) {
  if (!email.length) return true;
  return validate.isEmail(email);
}, msg.message.email.email);

mongoose.model('Message', MessageSchema);
