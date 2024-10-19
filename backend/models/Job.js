const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    jobTitle: { type: String, required: true },
    jobDescription: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    endDate: { type: Date, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    candidates: [{ email: { type: String } }]
});

module.exports = mongoose.model('Job', JobSchema);
