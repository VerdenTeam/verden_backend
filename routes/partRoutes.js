const router = require("express").Router();
const ctrl = require("../controllers/partControllers");

router.post("/save/:courseID/:sectionID", ctrl.savePart);
router.put("/update/:id", ctrl.updatePart);
router.delete("/delete/:id", ctrl.deletePart);
router.get("/get/:courseID/:sectionID", ctrl.getParts);
router.get("/get/:id", ctrl.getPart);

module.exports = router;