/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path =require('path');
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
    appInfo.sessionStore = {
    // support promise / async
    async get (key) {
      // return value;
    },
    async set (key, value, maxAge) {
      // set key to store
    },
    async destroy (key) {
      // destroy key
    },
  };
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568166746269_2877';

  // add your middleware config here
  config.middleware = [];
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
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
