const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    testimonial: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.models.Reference || mongoose.model('Reference', referenceSchema);