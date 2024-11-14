const express = require("express");
const router = express.Router();
const multer = require("multer");
const orderController = require("../controllers/orderController");
const verifyToken = require("../middleware/authMiddleware");
const roleCheck = require("../middleware/roleCheckMiddleware");
const upload = multer({ storage: multer.memoryStorage() });
const {
  createOrderValidation,
  validate,
} = require("../validation/orderValidation");


router.post(
  "/",
  verifyToken,
  roleCheck("procurement_manager", "admin"),
  upload.single("file"),
  createOrderValidation,
  validate,
  orderController.createOrder
);

router.get(
  "/",
  verifyToken,
  roleCheck("procurement_manager", "admin"),
  orderController.getAllOrders
);
router.put(
  "/:id",
  verifyToken,
  roleCheck("procurement_manager", "admin"),
  orderController.changeOrderStatus
);
router.get("/:id", verifyToken, orderController.getOrderStatus);
router.get("/file/:id", orderController.getOrderFile);

module.exports = router;
