const nodemailer = require('nodemailer');

exports.register = function() {
    this.loginfo("HELLO CHAYJ ROOI")
        // this.register_hook('queue', 'send_email');
    var transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 25,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'username1',
            pass: 'akatestpassword'
        },
        tls: {
            rejectUnauthorized: false,
            // secureProtocol: 'TLSv1_2_method' // specify a compatible SSL/TLS version
        }
    });

    var mailOptions = {
        from: 'mail_from@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Test email from Haraka',
        text: 'body',
        html: '<b>Hello world?</b>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

// exports.send_email = function(next, connection) {
// var mail_from = connection.transaction.mail_from;
// var rcpt_to = connection.transaction.rcpt_to;
// var body = connection.transaction.message_stream.get_data();

// var transporter = nodemailer.createTransport({
//     host: '158.101.137.14',
//     port: 25,
// secure: true,
// auth: {
//     user: 'cuong@demo.akadigital.com',
//     pass: 'password2'
// }
// });

// var mailOptions = {
//     from: 'mail_from@demo.akadigital',
//     to: 'cuong.truong@akadigital.vn',
//     subject: 'Test email from Haraka',
//     text: 'body'
// };

// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });

// next();
// }