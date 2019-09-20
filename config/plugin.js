'use strict';
// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
exports.helper = {
  enable: true,
  package: 'egg-helper',
};
exports.session = true;

exports.sessionRedis = {
  enable: true,
  package: 'egg-session-redis',
};
 
exports.redis = {
  enable: true,
  package: 'egg-redis',
};

