const express = require("express");
const router = express.Router();

class navHistoryRouter {
  constructor(controller) {
    this.controller = controller;
  }
  routes() {
    console.log("here");
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller));
    router.post("/", this.controller.insertOne.bind(this.controller));
    //router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = navHistoryRouter;