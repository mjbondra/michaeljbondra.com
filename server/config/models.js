
/**
 * App models, in load order
 */
var models = [
  'image',
  'user',
  'project'
];

module.exports = function (modelsPath) {
  models.forEach(function (model) {
    require(modelsPath + model);
  });
};
