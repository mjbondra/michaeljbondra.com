// bootstrap models by specifying component names in preferred load order
var components = [
  'projects',
  'messages'
];

module.exports = function (config) {
  var componentsPath = config.path.root + '/server/components/';
  components.forEach(function (component) {
    require(componentsPath + component + '/model');
  });
};
