const nodemailer = require('nodemailer');

// const from = 'sender@demo.akadigital.net';
// const to = 'phucuong200297@gmail.com';
// const subject = 'Test Email';
// const body = 'This is a test email message.';
const transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 25,
    secure: false,
    auth: {
        user: 'your-email@example.com',
        pass: 'your-password'
    }
});
var from = 'sender@demo.akadigital.net';
var to = 'phucuong200297@gmail.com';
var subject = 'Test Email C';
var body = 'This is a test email message.';


const mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: body,
    html: '<p>HTML message</p>'
};


transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});