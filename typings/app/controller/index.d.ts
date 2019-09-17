// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome = require('../../../app/controller/home');
import ExportShow = require('../../../app/controller/show');

declare module 'egg' {
  interface IController {
    home: ExportHome;
    show: ExportShow;
  }
}
