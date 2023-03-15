const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'username1', // your Gmail email address
        pass: 'akatestpassword' // your Gmail password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: 'mail_from@demo.akadigital.net',
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