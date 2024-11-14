const express = require("express");
const checklistController = require("../controllers/checklistController");
const verifyToken = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheckMiddleware");
const {
  checklistValidationRules,
  validateChecklist,
} = require("../validation/checklistValidation");
const router = express.Router();
// const { uploadFile } = require("../controllers/uploadController");

router.post(
  "/",
  checklistValidationRules,
  validateChecklist,
  verifyToken,
  roleCheck("procurement_manager", "admin"),
  checklistController.createChecklist
);
router.put(
  "/:id/approve",
  verifyToken,
  roleCheck("procurement_manager", "admin"),
  checklistController.approveChecklist
);
// router.post(
//   "/upload",
//   verifyToken,
//   roleCheck("procurement_manager", "admin"),
//   uploadFile
// );

module.exports = router;
