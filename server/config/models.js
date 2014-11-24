var fs = require('fs');

/**
* bootstrap component models in one of two ways:
* - 1. Automatically (default)
* - 2. Specify EACH component by name in preferred load order
*/

var components;
// var components = [
//   'comments'
// ];

module.exports = function (config) {
  var componentsPath = config.path.root + '/server/components/';

  if ((components || []).length > 0) components.forEach(function (component) {
    require(componentsPath + component + '/model');
  });
  else fs.readdirSync(componentsPath).forEach(function (component) {
    var modelPath = componentsPath + component + '/model.js';
    if (fs.existsSync(modelPath)) require(modelPath);
  });
};
