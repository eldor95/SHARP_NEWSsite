const mongoose = require('mongoose')

const news = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    counter: { type: Number, default: 0 },
    tag: { type: String, required: true },
    rating: { type: Number, default: 0 },
    category_ID: {
        type: mongoose.Schema.ObjectId,
        ref: "CATEGORY",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('NEWS', news);