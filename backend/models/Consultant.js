const mongoose = require('mongoose');

const consultantSchema = new mongoose.Schema({
    skills: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    resumeReferences: {
        type: [String],
        required: false
    }
});

const Consultant = mongoose.model('Consultant', consultantSchema);

module.exports = Consultant;