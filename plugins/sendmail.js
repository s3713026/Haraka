const nodemailer = require('nodemailer');

exports.hook_init_master = function(next, connection) {
    // Create a nodemailer transport object
    const transporter = nodemailer.createTransport({
        // Replace the host, port, user, and password with your SMTP server details
        host: 'demo.akadigital.net',
        port: 587,
        secure: false,
    });

    // Create a mail options object
    const mailOptions = {
        from: 'sender@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Haraka server started',
        text: 'The Haraka server has started running',
    };

    // Send the email
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.error(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    next();
};