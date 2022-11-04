const express = require("express");
const router = express.Router();
class cartRouter {
  constructor(controller, auth) {
    this.auth = auth;
    this.controller = controller;
  }
  routes() {
    // we will insert routes into here later on
    router.get("/", this.controller.getAll.bind(this.controller), this.auth);

    router.get(
      "/:user_id",
      this.controller.getAll.bind(this.controller),
      this.auth
    );

    router.put("/", this.auth, this.controller.downOne.bind(this.controller)),
      router.post(
        "/",
        this.auth,
        this.controller.insertOne.bind(this.controller)
      );
    //router.get("/:sightingId", this.controller.getOne.bind(this.controller));
    return router;
  }
}

module.exports = cartRouter;
