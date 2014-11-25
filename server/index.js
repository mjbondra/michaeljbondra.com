/**
 *                     88 88                                           88
 *                     "" 88                                           88
 *                        88                                           88
 *  88,dPYba,,adPYba,  88 88,dPPYba,   ,adPPYba,  8b,dPPYba,   ,adPPYb,88 8b,dPPYba, ,adPPYYba,
 *  88P'   "88"    "8a 88 88P'    "8a a8"     "8a 88P'   `"8a a8"    `Y88 88P'   "Y8 ""     `Y8
 *  88      88      88 88 88       d8 8b       d8 88       88 8b       88 88         ,adPPPPP88
 *  88      88      88 88 88b,   ,a8" "8a,   ,a8" 88       88 "8a,   ,d88 88         88,    ,88
 *  88      88      88 88 8Y"Ybbd8"'   `"YbbdP"'  88       88  `"8bbdP"Y8 88         `"8bbdP"Y8
 *                    ,88
 *                  888P"
 */

/**
 * Koa core
 */
var koa = require('koa')
  , app = koa();

// use environment-specific configuration; default to 'development' if unspecified
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env];

require('./config/mongoose')(config);
require('./config/models')(config);
require('./config/koa')(app, config);
require('./config/routes')(app);

app.listen(config.port, function () {
  console.log('Listening for Connections', { port: config.port });
});

module.exports = app;
