const nodemailer = require('nodemailer');

exports.register = function() {
    // Register a hook that will be triggered when Haraka starts up
    this.register_hook('server_start', 'sendmail');
}

exports.sendmail = function(next) {
    // Create a nodemailer transport object
    const transporter = nodemailer.createTransport({
        host: 'demo.akadigital.net',
        port: 465,
        secure: true,
        auth: {
            user: 'username1',
            pass: 'akatestpassword'
        }
    });

    // Create an email message
    const mailOptions = {
        from: 'sender@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Haraka server started',
        text: 'The Haraka server has started up successfully.'
    };

    // Send the email message
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Email sent:', info);
        }
        // Call the 'next' function to continue processing
        next();
    });
}