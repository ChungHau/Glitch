const express = require("express");
const router = express.Router()
const controller = require('../controllers/user-controller');

router.get("/", controller.users);

//View User
router.get("/:id/view", controller.view);

//Create user
router.get("/create", controller.create);

router.post("/create", controller.postCreate);

//Update user
router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

//DELETE
router.get("/:id/delete", controller.delete);

module.exports = router;
