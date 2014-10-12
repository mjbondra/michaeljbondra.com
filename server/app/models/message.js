var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , validator = require('validator');

var MessageSchema = new Schema({
  body: String,
  email: String
});

MessageSchema.pre('validate', function (next) {
  validator.escape(this.body);
  if (this.email) validator.escape(this.email);
  next();
});

mongoose.model('Message', MessageSchema);
