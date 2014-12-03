var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , slug = require('../../../shared/slug');

var ProjectSchema = new Schema({
  body: String,
  color: String,
  image: {
    background: {
      desktop: String, // 1340 x 700
      mobile: String, // 480 x 340
      mobileWide: String, // 767 x 340
      repeat: Boolean,
      tablet: String // 1024 x 500
    },
    thumbnail: {
      lowResolution: String, // 150 x 150
      highResolution: String, // 300 x 300
      repeat: Boolean
    }
  },
  links: [{
    title: String,
    url: String
  }],
  slug: {
    type: String,
    index: {
      unique: true
    }
  },
  tags: [ String ],
  title: String
});

ProjectSchema.pre('save', function (next) {
  this.slug = slug(this.title);
  next();
});

mongoose.model('Project', ProjectSchema);
