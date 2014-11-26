var mongoose = require('mongoose');

module.exports = function (config) {
  if (config.env === 'development') mongoose.set('debug', true);

  var connect = function () {
    var opts = { server: { socketOptions: { keepAlive: 1 } } };
    mongoose.connect('mongodb://' + config.mongo.host + '/' + config.mongo.db, opts);
  };
  connect();

  mongoose.connection.on('disconnected', function () {
    connect();
  });
  mongoose.connection.on('error', function (err) {
    console.error(err);
  });
  mongoose.connection.once('open', function callback () {
    if (config.env !== 'test')
      console.log('Connected to MongoDB', config.mongo);
  });

};
