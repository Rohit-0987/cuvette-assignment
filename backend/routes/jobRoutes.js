const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { sendEmail } = require('../utils/sendEmail');
const Job = require('../models/Job');
const { generateJobEmailTemplate } = require('../utils/emailTemplate');

const router = express.Router();

// Post a job
router.post('/', protect, async (req, res) => {
    const { title, description, experienceLevel, candidateEmails, endDate } = req.body;
    try {
        const job = await Job.create({
            jobTitle:title,
            jobDescription:description,
            experienceLevel,
            company: req.user._id,
            endDate,
        });
        // Send email to candidates
        const emails = candidateEmails.split(',');
        for (const email of emails) {
            const htmlContent = generateJobEmailTemplate(job); // Generate HTML content
            await sendEmail(emails, 'Job Opportunity', htmlContent); 
        }

        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Failed to post job' });
    }
});

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().populate('company', 'companyName'); // Populate company details if needed
        jobs.forEach(job => {
            if (job.company) {
                console.log("Company Name:", job.company.companyName); 
            } else {
                console.log("Company is undefined for this job");
            }
        });
        res.status(200).json(jobs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch jobs' });
    }
});



module.exports = router;
