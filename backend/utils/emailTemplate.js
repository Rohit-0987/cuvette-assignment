
const generateJobEmailTemplate = (job) => {
    return `
        <h1>Job Opportunity</h1>
        <p>Dear Candidate,</p>
        <p>We are excited to inform you about a new job opening that matches your profile!</p>
        <h2>${job.jobTitle}</h2>
        <p><strong>Job Description:</strong> ${job.jobDescription}</p>
        <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
        <p><strong>Company:</strong> ${job.company.companyName}</p>
        <p>If you're interested, please reply to this email or click the link below to apply.</p>
        <p><a href="YOUR_APPLICATION_LINK_HERE">Apply Now</a></p>
        <p>Best regards,<br/>The Recruitment Team</p>
    `;
};

module.exports = { generateJobEmailTemplate };
