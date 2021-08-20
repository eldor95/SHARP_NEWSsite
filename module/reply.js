const mongoose = require('mongoose')


const Reply = mongoose.Schema({
    message: {
        type: String,
        required: true
    },
    comment_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "COMMENT",
        required: true,
    },
    user_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "USER",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});
module.exports = mongoose.model('REPLY', Reply);