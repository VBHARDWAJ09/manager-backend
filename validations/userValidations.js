const { body } = require('express-validator')

module.exports.registerValidations = [
    body('name').not().isEmpty().trim().escape().withMessage('Invalid name'),
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('password at least 5 characters')
]

module.exports.loginValidations = [
    body('email').isEmail().normalizeEmail().trim().escape().withMessage('Invalid email'),
    body('password').isLength({ min: 5 }).withMessage('password at least 5 characters')
]