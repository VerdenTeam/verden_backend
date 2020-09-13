const { Router } = require("express");

const router = require("express").Router();
const ctrl = require("../controllers/coursesControllers");

router.post("/save", ctrl.saveCourse);
router.get("/get", ctrl.getCourses);
router.get("/get/:id", ctrl.getCourse);
router.delete("/delete/:id", ctrl.deleteCourse);
router.put("/update/:id", ctrl.updateCourse);

module.exports = router