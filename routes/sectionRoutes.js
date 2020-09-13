const router = require("express").Router();
const ctrl = require("../controllers/sectionControllers");

router.post("/save/:id", ctrl.saveSection);
router.put("/update/:id", ctrl.updateSection);
router.delete("/delete/:id", ctrl.deleteSection);
router.get("/get", ctrl.getSections);
router.get("/get/:id", ctrl.getSection);

module.exports = router;