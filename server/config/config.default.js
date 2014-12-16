/** LOCALIZE CONFIGURATION AND RENAME TO 'config.js' */

var path = require('path')
  , port = process.env.PORT || 9999
  , root = path.normalize(__dirname + '/../..');

module.exports = {
  development: {
    env: 'development',
    googleRecaptcha: {
      secretKey: 'secretKey',
    },
    mongo: {
      host: 'localhost',
      db: 'db_dev'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  test: {
    env: 'test',
    googleRecaptcha: {
      secretKey: 'secretKey',
    },
    mongo: {
      host: 'localhost',
      db: 'db_test'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
  production: {
    env: 'production',
    googleRecaptcha: {
      secretKey: 'secretKey',
    },
    mongo: {
      host: 'localhost',
      db: 'db_prod'
    },
    path: {
      root: root,
      static: root + '/client',
      tmp: root + '/tmp'
    },
    port: port,
    secrets: ['secretString']
  },
};
