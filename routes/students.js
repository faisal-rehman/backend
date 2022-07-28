const express = require("express");
const studentController = require("../controllers/StudentController");

const router = express.Router();

router.get("/", studentController.index);
router.get("/:id", studentController.show);
router.put("/:id", studentController.update);

module.exports = router;
