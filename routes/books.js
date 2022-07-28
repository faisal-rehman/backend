const express = require("express");
const bookController = require("../controllers/BooksController");

const router = express.Router();

router.get("/", bookController.index);
router.get("/:id", bookController.show);
router.put("/:id", bookController.update);

module.exports = router;
