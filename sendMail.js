const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 25,
    secure: true, // true for 465, false for other ports
});

// setup email data
let mailOptions = {
    from: 'cuongtest@demo.akadigital.net', // sender address
    to: 'cuong.truong@akadigital.vn', // list of receivers
    subject: 'Hello from Haraka!', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world!</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Message sent: %s', info.messageId);
    }
});