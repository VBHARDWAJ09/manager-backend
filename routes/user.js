const express = require('express')
const router = express.Router()
const { registerController, loginController } = require('../controller/user')
const { registerValidations, loginValidations } = require('../validations/userValidations')

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: To create a new user.
 *     tags:
 *        - Public APIs
 *     requestBody:
 *         required: true
 *         content:
 *              application/json: 
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *     responses:
 *         "200":
 *             description: User Created
 *         "203":
 *             description: User Already Registered
 *         "400":
 *             description: Validation Error
 *         "500":
 *             description: Internal Server Error
 */
router.post('/register', registerValidations, registerController)

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login api.
 *     tags:
 *        - Public APIs
 *     requestBody:
 *         required: true
 *         content:
 *              application/json: 
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *     responses:
 *         "200":
 *             description: User Login Successfully
 *         "201":
 *             description: Incorrect password
 *         "203":
 *             description: User Not Exist
 *         "400":
 *             description: Validation Error
 *         "500":
 *             description: Internal Server Error
 */
router.post('/login', loginValidations, loginController)

module.exports = router;