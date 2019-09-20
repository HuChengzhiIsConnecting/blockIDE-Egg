/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path =require('path');
const {mysql} = require('./mysql');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568166746269_2877';

  // add your middleware config here
  config.middleware = [];
  config.mysql = mysql;
  config.view = {
    mapping: { '.html': 'ejs' } //左边写成.html后缀，会自动渲染.html文件

  };
  config.security = {
    csrf: {
      enable: false,
      ignoreJSON: true
    },
    xframe: {
      enable: false,
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: '*',
    credentials: true,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  };
  exports.redis = {
    // your redis configurations
    client: {
      port: 6379, // Redis port
      host: '127.0.0.1', // Redis host
      password: '',
      db: 0,
      }
  };
  exports.sessionRedis = {
    name: 'session', // specific instance `session` as the session store
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
