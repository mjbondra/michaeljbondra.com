var mongoose = require('mongoose');

var MONGO_STATES = {
  0: 'disconnected',
  1: 'connected',
  2: 'connecting',
  3: 'disconnecting'
};

exports.show = function *() {
  var mongoStateKey = mongoose.connection.readyState
    , mongoState = MONGO_STATES[mongoStateKey];

  var response = {
    mongoDB: {
      stateCode: mongoStateKey,
      state: mongoState
    }
  };

  if (mongoStateKey === 1) {
    response.status = 'green';
  } else if (mongoStateKey > 1) {
    response.status = 'yellow';
  } else {
    response.status = 'red';
  }

  this.body = response;
};
