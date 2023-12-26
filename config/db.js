const mongoose = require('mongoose')
const constants = require('./constants')

module.exports = async () => {
    try {
        console.log("DB connecting")
        await mongoose.connect(constants.db_url)
        console.log("DB connected")
    } catch (err) {
        console.log(err.message)
        console.log("DB error")
    }
}