const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");

const { registerValidation, loginValidation, validate } = require('../validation/userValidation');

router.post("/register",registerValidation,validate, userController.register);
router.post("/login", loginValidation,validate,userController.login);
router.get('/', verifyToken, userController.getAllUsers);

module.exports = router;
