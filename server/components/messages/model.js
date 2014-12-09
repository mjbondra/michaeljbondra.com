var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , validate = require('validator');

var MessageSchema = new Schema({
  body: {
    required: 'Comment cannot be empty.',
    type: String
  },
  email: {
    type: String,
    validate: [{
      validator: validate.isEmail, msg: 'Email address is not valid.'
    }]
  },
  name: String,
  ip: String
});

MessageSchema.pre('validate', function (next) {
  validate.escape(this.body);
  if (this.email) validate.escape(this.email);
  if (this.name) validate.escape(this.name);
  next();
});

mongoose.model('Message', MessageSchema);
