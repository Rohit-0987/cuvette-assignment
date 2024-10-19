const nodemailer = require('nodemailer');

/**
 * Sends an email using Nodemailer.
 *
 * @param {string} email - The recipient's email address.
 * @param {string} subject - The subject of the email.
 * @param {string} htmlContent - The HTML content of the email.
 */
exports.sendEmail = async (email, subject, htmlContent) => {
    // Create a transporter for sending emails
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    // Define mail options
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,  // Recipient's email address
        subject: subject,
        html: htmlContent,  // HTML content for email
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully.");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
