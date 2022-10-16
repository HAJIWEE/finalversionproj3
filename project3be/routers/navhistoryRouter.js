const express = require("express");
const router = express.Router();
class navHistoryRouter {
  constructor(controller, auth) {
    this.auth = auth;
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.auth, this.controller.getAll.bind(this.controller));
    router.post(
      "/",
      this.auth,
      this.controller.insertOne.bind(this.controller)
    );
    //router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = navHistoryRouter;
