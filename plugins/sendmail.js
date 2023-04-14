// const nodemailer = require('nodemailer');

// exports.register = function() {
//     this.logdebug("registering the sendMail plugin");

//     this.register_hook('server_start', 'sendMail');
// }

// exports.sendMail = function(next, connection) {
//     const body = connection.transaction.body;

//     let transporter = nodemailer.createTransport({
//         host: 'localhost',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: 'cuong.truong@akadigital.vn', // your email address
//             pass: 'password3' // your email password
//         }
//     });
//     su

//     let mailOptions = {
//         from: 'aka@demo.akadigital.net', // sender address
//         to: body.header.to, // recipient address
//         subject: body.header.subject, // Subject line
//         text: body.bodytext, // plain text body
//         html: body.bodytext // html body
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             this.logerror(error);
//             return next(DENY, "Error sending email");
//         }
//         this.loginfo('Message sent: %s', info.messageId);
//         return next(OK);
//     });
// };

exports.register = function() {
    // Register a hook that will be triggered when Haraka starts up
    this.register_hook('server_start', 'sendmail');
}

exports.sendmail = function(next, connection) {
    // Use the 'sendmail' method of the 'sendmailer' plugin to send an email
    const mailOptions = {
        from: 'sender@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Haraka server started',
        text: 'The Haraka server has started up successfully.'
    };
    connection.sendmailer.sendmail(mailOptions, function(err, info) {
        if (err) {
            console.log('Error sending email:', err);
        } else {
            console.log('Email sent:', info);
        }
        // Call the 'next' function to continue processing
        next();
    });
}