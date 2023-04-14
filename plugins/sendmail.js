const nodemailer = require('nodemailer');


exports.register = function(server, next) {
    server.on('listen', function() {
        // Create a Nodemailer transport
        const transporter = nodemailer.createTransport({
            host: 'demo.akadigittal.net',
            port: 587,
            secure: false,
            auth: {
                user: 'username1',
                pass: 'akatestpassword'
            }
        });

        // Send an email
        transporter.sendMail({
            from: 'sender@demo.akadigital.net',
            to: 'phucuong200297@gmail.com',
            subject: 'Server is running',
            text: 'The Haraka server has started.'
        });
    });
    next();
};