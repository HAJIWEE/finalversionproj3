const express = require("express");
const router = express.Router();
class listingRouter {
  constructor(controller, auth) {
    this.auth = auth;
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get(
      "/:itemName",
      this.controller.getOne.bind(this.controller),
      this.auth
    );

    router.get("/", this.controller.getAll.bind(this.controller), this.auth);

    router.get(
      "/search/:Param",
      this.controller.searchFor.bind(this.controller),
      this.auth
    );

    router.post(
      "/",
      this.auth,
      this.controller.insertOne.bind(this.controller)
    );

    router.put(
      "/update/:itemName",
      this.auth,
      this.controller.updateOne.bind(this.controller)
    );
    //router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = listingRouter;
