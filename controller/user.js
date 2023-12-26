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
                return res.status(200).json({ messages: [{ msg: "User registed successfully" }], success: true })
            } else {
                return res.status(200).json({ messages: [{ msg: "User Already Exist" }], success: false })
            }
        } catch (err) {
            return res.status(500).json({ messages: [{ msg: err.message }], success: false })
        }
    } else {
        return res.status(400).json({ messages: filterKeysFromArray(errors.array(), ['msg']), success: false })
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
                    return res.status(200).json({ messages: [{ msg: "Login successfully." }], token, success: true })
                } else {
                    return res.status(201).json({ messages: [{ msg: "Incorrect password" }], success: false })
                }
            } else {
                return res.status(203).json({ messages: [{ msg: "User Not Exist" }], success: false })
            }
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({ messages: [{ msg: err.message }], success: false })
        }
    } else {
        return res.status(400).json({ messages: filterKeysFromArray(errors.array(), ['msg']), success: false })
    }
}