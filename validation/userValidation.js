// validators.js
const { body, validationResult } = require('express-validator');

// Custom validator for checking if a value is strong enough
const isStrongPassword = (value) => {
  const strongPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  return strongPasswordPattern.test(value);
};

const registerValidation = [
  body('name')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
    .notEmpty().withMessage('Name is required'),

  body('email')
    .isEmail().withMessage('Email must be a valid email address')
    .isLength({ min: 6 }).withMessage('Email must be at least 6 characters long')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isString().withMessage('Password must be a string')
    .custom(isStrongPassword).withMessage('Password must be at least 6 characters long, include letters, numbers, and special characters')
    .notEmpty().withMessage('Password is required'),

  body('role')
    .isString().withMessage('Role must be a string')
    .isIn(['admin', 'procurement_manager', 'inspection_manager', 'client']).withMessage('Role must be one of the specified values')
    .notEmpty().withMessage('Role is required'),

  body('mobile')
    .optional()
    .isString().withMessage('Mobile must be a string')
    .isLength({ min: 10, max: 15 }).withMessage('Mobile must be between 10 and 15 characters long')
    .matches(/^[0-9]+$/).withMessage('Mobile must contain only digits'),
];

const loginValidation = [
  body('email')
    .isEmail().withMessage('Email must be a valid email address')
    .isLength({ min: 6 }).withMessage('Email must be at least 6 characters long')
    .notEmpty().withMessage('Email is required'),

  body('password')
    .isString().withMessage('Password must be a string')
    .notEmpty().withMessage('Password is required'),
];

// Middleware to check for validation errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { registerValidation, loginValidation, validate };
