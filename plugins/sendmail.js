'use strict';

const nodemailer = require('nodemailer');

exports.register = function() {
    this.loginfo("Register run send mail");
    // Create a new Nodemailer transporter
    const transporter = nodemailer.createTransport({
        host: 'demo.akadigital.net',
        port: 587,
        secure: false,
        // auth: {
        //     user: 'username',
        //     pass: 'password'
        // }
    });

    // Create the email message
    const message = {
        from: 'sender@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Haraka server started',
        text: 'The Haraka server has started.'
    };

    // Send the email
    transporter.sendMail(message, (err, info) => {
        if (err) {
            this.loginfo(err);
        } else {
            this.loginfo('Email sent:', info.response);
        }
    });
};

exports.hook_queue = function(next, connection) {
    // Don't queue any messages
    return next(OK);
};