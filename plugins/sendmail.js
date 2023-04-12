const nodemailer = require('nodemailer');

exports.register = function() {
    this.loginfo('Registering sendmail plugin');
    const transporter = nodemailer.createTransport({
        host: 'demo.akadigital.net',
        port: 587,
        secure: false,
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'aka@demo.akadigital.net',
        // to: recipients.join(','),
        to: 'phucuong200297@gmail.com',
        subject: 'New message',
        text: 'Hello world!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            connection.logerror(`Failed to send email: ${error}`);
        } else {
            connection.loginfo(`Email sent: ${info.messageId}`);
        }

        next();
    });
}

// exports.hook_queue = function(next, connection) {
//     const recipients = connection.transaction.rcpt_to.map(to => to.address());

//     const transporter = nodemailer.createTransport({
//         host: 'demo.akadigital.net',
//         port: 25,
//         secure: false,
//         tls: {
//             rejectUnauthorized: false
//         }
//     });

//     const mailOptions = {
//         from: 'aka@demo.akadigital.net',
//         // to: recipients.join(','),
//         to: 'phucuong200297@gmail.com',
//         subject: 'New message',
//         text: 'Hello world!'
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             connection.logerror(`Failed to send email: ${error}`);
//         } else {
//             connection.loginfo(`Email sent: ${info.messageId}`);
//         }

//         next();
//     });
// }