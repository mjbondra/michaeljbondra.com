var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , slug = require('../../../util/slug');

var ProjectSchema = new Schema({
  body: String,
  github: String,
  background: {
    color: String,
    image: {
      global: String,
      desktop: String, // 1340 x 700
      mobileWide: String, // 767 x 340
      tablet: String // 1024 x 500
    },
    video: {
      mp4: String,
      webm: String
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
