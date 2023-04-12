const nodemailer = require('nodemailer');

// const from = 'sender@demo.akadigital.net';
// const to = 'phucuong200297@gmail.com';
// const subject = 'Test Email';
// const body = 'This is a test email message.';
// const transporter = nodemailer.createTransport("SMTP", {
//     host: 'demo.akadigital.net',
//     port: 25,
//     secure: false,
//     auth: {
//         user: 'cuong@demo.akadigital.com',
//         pass: 'password2'
//     }
// });
// var from = 'sender@demo.akadigital.net';
// var to = 'phucuong200297@gmail.com';
// var subject = 'Test Email C';
// var body = 'This is a test email message.';


// const mailOptions = {
//     from: from,
//     to: to,
//     subject: subject,
//     text: body,
//     html: '<p>HTML message</p>'
// };


// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });




// Create a SMTP transport object
const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 587,
    auth: {
        user: 'your-username',
        pass: 'your-password'
    },
    secure: false,
    tls: {
        rejectUnauthorized: false
    }
});

console.log('SMTP Configured');

// Message object
var message = {

    // sender info
    from: 'aka@demo.akadigital.net',

    // Comma separated list of recipients
    to: 'phucuong200297@gmail.com',

    // Subject of the message
    subject: 'Nodemailer is unicode friendly ✔',

    // plaintext body
    text: 'Hello to myself!',

    // HTML body
    html: '<p><b>Hello</b> to myself <img src="cid:note@node"/></p>' +
        '<p>Here\'s a nyan cat for you as an embedded attachment:<br/></p>'
};

console.log('Sending Mail');
transport.sendMail(message, function(error) {
    if (error) {
        console.log('Error occured');
        console.log(error.message);
        return;
    }
    console.log('Message sent successfully!');
});