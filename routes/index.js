module.exports = (app, allModels) => {
  /*
   *  =========================================
   *  =========================================
   *  =========================================
   *  =========================================
   *    ALL ROUTES FOR BIBLIODOME CONTROLLER
   *  =========================================
   *  =========================================
   *  =========================================
   */

  // require the controller
  // const controllerCallbacks = require("./controllers/controllersIndex.js")(
  //   allModels
  // );

  const bookController = require("../controllers/book");
  const userController = require("../controllers/user");
  app.get("/", bookController);

  // CONTROLLERS
  app.use(bookController);
  app.use(userController);

  // app.get("/", controllerCallbacks.index);
};
