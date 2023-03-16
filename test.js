const nodemailer = require('nodemailer');
const tls = require('tls');
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'username1',
        pass: 'akatestpassword'
    },
    tls: {
        rejectUnauthorized: false
            // secureProtocol: 'TLSv1_2_method' // specify a compatible SSL/TLS version
    }
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