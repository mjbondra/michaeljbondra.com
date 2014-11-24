var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var ErrorSchema = new Schema({
  ip: String,
  method: String,
  referer: String,
  stack: String,
  status: Number,
  url: String
});

mongoose.model('Error', ErrorSchema);
