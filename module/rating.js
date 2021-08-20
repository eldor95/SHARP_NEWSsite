const mongoose = require('mongoose')

const Rating = mongoose.Schema({
    rating: { type: Number, required: true },
    news_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "NEWS",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('RATING', Rating);