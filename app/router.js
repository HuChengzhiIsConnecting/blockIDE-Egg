'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/api/edit', controller.editor.edit);
  router.get('/api/display', controller.editor.display);
  router.post('/api/save', controller.editor.save);
};
