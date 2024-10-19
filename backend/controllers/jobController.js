const Job = require('../models/Job');
const { sendEmail } = require('../utils/sendEmail');
const { generateJobEmailTemplate } = require('../utils/emailTemplate');

// Post Job
exports.postJob = async (req, res) => {
    const { jobTitle, jobDescription, experienceLevel, endDate } = req.body;

    try {
        const job = await Job.create({
            jobTitle,
            jobDescription,
            experienceLevel,
            endDate,
            company: req.user.id
        });

        res.status(201).json({ job });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Send Job Emails to Candidates
exports.sendJobEmail = async (req, res) => {
    const { jobId, candidates } = req.body;

    try {
        const job = await Job.findById(jobId).populate('company');
        const emails = candidateEmails.split(',');
        for (const email of emails) {
            const message = generateJobEmailTemplate(job);
            await sendEmail(email, `Job Opportunity: ${job.jobTitle}`, message);
        }
        // candidates.forEach(candidate => {
        //     const message = `
        //         Job Title: ${job.jobTitle}
        //         Job Description: ${job.jobDescription}
        //         Experience Level: ${job.experienceLevel}
        //         Company: ${job.company.companyName}
        //     `;
        //     sendEmail(candidate, 'Job Opportunity', message);
        // });

        res.status(200).json({ message: "Emails sent successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
