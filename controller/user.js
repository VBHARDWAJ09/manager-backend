const userModal = require('../modal/user')
const { validationResult } = require('express-validator')
const { comparePassword, hashedPassword, createToken, filterKeysFromArray } = require('../services/commonService')


module.exports.registerController = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const { name, email, password } = req.body;
            const userExist = await userModal.findOne({ email })
            if (!userExist) {
                const _password = await hashedPassword(password)
                await userModal.create({ name, email, password: _password, admin: false })
                return res.status(200).json({ message: "User registed successfully" })
            } else {
                return res.status(203).json({ errors: [{ msg: "User Already Exist" }] })
            }
        } catch (err) {
            return res.status(500).json({ errors: [{ msg: err.message }] })
        }
    } else {
        return res.status(400).json({ errors: filterKeysFromArray(errors.array(), ['msg']) })
    }
}

module.exports.loginController = async (req, res) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        try {
            const { email, password } = req.body;
            const user = await userModal.findOne({ email })
            if (user) {
                const _match = await comparePassword(password, user.password)
                if (_match) {
                    const token = await createToken({ id: user._id, name: user.name })
                    return res.status(200).json({ message: "Login successfully.", token })
                } else {
                    return res.status(201).json({ errors: [{ msg: "Incorrect password" }] })
                }
            } else {
                return res.status(203).json({ errors: [{ msg: "User Not Exist" }] })
            }
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({ errors: [{ msg: err.message }] })
        }
    } else {
        return res.status(400).json({ errors: filterKeysFromArray(errors.array(), ['msg']) })
    }
}