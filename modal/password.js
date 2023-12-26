const mongoose = require('mongoose')

const passwordSchema = mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    description: {
        type: String,
    }
}, { timestamps: true })

module.exports = mongoose.model('password', passwordSchema)