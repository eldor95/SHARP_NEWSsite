const mongoose = require('mongoose');

const comment = mongoose.Schema({

    message: {
        type: String,
        required: true
    },
    user_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "USER",
        required: true
    },
    news_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "NEWS",
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }

})

module.exports = mongoose.model('COMMENT', comment)