var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , slug = require('../../../shared/slug');

var ProjectSchema = new Schema({
  body: String,
  color: String,
  github: String,
  image: {
    background: {
      repeat: Boolean,
      default: String, // 480 x 340
      desktop: String, // 1340 x 700
      mobileWide: String, // 767 x 340
      tablet: String // 1024 x 500
    },
    thumbnail: {
      default: String, // 150 x 150
      hiRes: String // 300 x 300
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
