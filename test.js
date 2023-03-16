const nodemailer = require('nodemailer');
const tls = require('./plugins/tls.ini')
    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'username1',
        pass: 'akatestpassword'
    },
    plugin: [tls({})]
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'test@demo.akadigital.net',
    to: 'phucuong200297@gmail.com',
    subject: 'Test email from Haraka',
    text: 'body',
    html: '<b>Hello world?</b>'
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log("ERROR ROI NE")
        console.log(error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
});