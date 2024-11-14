const { check, validationResult } = require("express-validator");

const checklistValidationRules = [
  check("itemName")
    .optional()
    .isString()
    .withMessage("Item name must be a string")
    .isLength({ min: 1 })
    .withMessage("Item name cannot be empty"),

  check("vehicleDetails")
    .optional()
    .isString()
    .withMessage("Vehicle details must be a string")
    .isLength({ min: 1 })
    .withMessage("Vehicle details cannot be empty"),

  check("driverDetails")
    .optional()
    .isString()
    .withMessage("Driver details must be a string")
    .isLength({ min: 1 })
    .withMessage("Driver details cannot be empty"),

  check("totalAmount")
    .optional()
    .isNumeric()
    .withMessage("Total amount must be a number")
    .custom((value) => {
      if (value < 0) {
        throw new Error("Total amount must be a positive number");
      }
      return true;
    }),

  check("itemType")
    .exists()
    .withMessage("Item type is required")
    .isString()
    .withMessage("Item type must be a string")
    .isIn(["eatable", "drinkable", "medicine"])
    .withMessage(
      "Item type must be one of the following: eatable, drinkable, medicine"
    ),

  check("isaSpecialPackagingRequired")
    .optional()
    .isString()
    .isIn(["yes", "no"])
    .withMessage('Special packaging required must be "yes" or "no"'),

  check("procurementManager")
    .optional()
    .isMongoId()
    .withMessage("Procurement manager must be a valid MongoDB ObjectId"),

  check("inspectionManager")
    .optional()
    .isMongoId()
    .withMessage("Inspection manager must be a valid MongoDB ObjectId"),
];

// Middleware to check for validation errors
const validateChecklist = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { checklistValidationRules, validateChecklist };
