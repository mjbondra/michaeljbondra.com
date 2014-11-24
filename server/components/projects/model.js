var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , slug = require('../../../shared/slug');

var ProjectSchema = new Schema({
  body: String,
  github: String,
  image: {
    thumbnail: String, // 150 x 150
    background: {
      desktop: String, // 1340 x 700
      mobile: String, // 480 x 340
      mobileWide: String, // 767 x 340
      tablet: String // 1024 x 500
    }
  },
  slug: {
    type: String,
    index: {
      unique: true
    }
  },
  tags: [ String ],
  title: String,
  url: String
});

ProjectSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

mongoose.model('Project', ProjectSchema);
