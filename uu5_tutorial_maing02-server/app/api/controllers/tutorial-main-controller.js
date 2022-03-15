"use strict";
const TutorialMainAbl = require("../../abl/tutorial-main-abl.js");

class TutorialMainController {
  init(ucEnv) {
    return TutorialMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }
}

module.exports = new TutorialMainController();
