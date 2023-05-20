const {body} = require('express-validator');

const validator = {};
//Propuesta en clase
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validator.register = [
    
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is not valid'),

    body('username').notEmpty().withMessage('Username is required').isLength({min: 3, max: 30}).withMessage('Username must be between 3 and 30 characters'),

    body('password').notEmpty().withMessage('Password is required').matches(passwordRegex).withMessage('Password must be between 8 and 32 characters, must contain at least one uppercase letter, one lowercase letter and one number'),

    body('description').optional().isString().default("Descripcion no definida.")
]

module.exports = validator;