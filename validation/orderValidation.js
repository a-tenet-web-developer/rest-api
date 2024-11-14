// orderValidators.js
const { body, validationResult } = require("express-validator");

const createOrderValidation = [
  body("clientId")
    .isString()
    .withMessage("Client ID must be a string")
    .notEmpty()
    .withMessage("Client ID is required"),

  body("procurementManagerId")
    .isString()
    .withMessage("Procurement Manager ID must be a string")
    .notEmpty()
    .withMessage("Procurement Manager ID is required"),

  body("checklistId")
    .isString()
    .withMessage("Checklist ID must be a string")
    .notEmpty()
    .withMessage("Checklist ID is required"),

  body("inspectionManagerId")
    .isString()
    .withMessage("Inspection Manager ID must be a string")
    .notEmpty()
    .withMessage("Inspection Manager ID is required"),
];

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { createOrderValidation, validate };
