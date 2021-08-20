const mongoose = require('mongoose')

const result = mongoose.Schema({
    description: { type: String, required: true },

    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('FEEDBACK', result);