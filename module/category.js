const mongoose = require('mongoose')

const catergory = mongoose.Schema({
    name: { type: String, required: true }
}, {
    timestamps: true
});
module.exports = mongoose.model('CATEGORY', catergory);