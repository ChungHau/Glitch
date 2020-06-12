const express = require("express");
const router = express.Router();
const controller = require('../controllers/book-controller');

router.get("/", controller.books);

//ADD
router.get("/add", controller.add);

router.post("/add", controller.postAdd);

//VIEW
router.get("/:id/view", controller.view);

//UPDATE
router.get("/:id/update", controller.update);

router.post("/:id/update", controller.postUpdate);

//DELETE
router.get("/:id/delete", controller.delete);

module.exports = router;
