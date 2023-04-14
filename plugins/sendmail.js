const nodemailer = require('nodemailer');

function sendMail() {
    // Create a Nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com',
        port: 587,
        secure: false,
        auth: {
            user: 'user@example.com',
            pass: 'password'
        }
    });

    // Define the email message
    const mailOptions = {
        from: 'sender@example.com',
        to: 'recipient@example.com',
        subject: 'Haraka server is running',
        text: 'The Haraka server is running.'
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = sendMail;