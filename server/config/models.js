
/**
 * App models, in load order
 */
var models = [
  'image',
  'user',
  'description',
  'project'
];

module.exports = function (modelsPath) {
  models.forEach(function (model) {
    require(modelsPath + model);
  });
};
