const nodemailer = require('nodemailer');


console.log("Register run send mail");
// Create a new Nodemailer transporter
const transporter = nodemailer.createTransport({
    // host: '158.101.137.14',
    host: 'demo.akadigital.net',
    port: 25,
    secure: false,
    auth: {
        user: 'username1',
        pass: 'akatestpassword'
    }
});
console.log(transporter)

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
        console.log(err);
    } else {
        console.log('Email sent:', info.response);
    }
});