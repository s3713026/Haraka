const nodemailer = require('nodemailer');


this.loginfo("Register run send mail");
// Create a new Nodemailer transporter
const transporter = nodemailer.createTransport({
    // host: '158.101.137.14',
    host: 'localhost',
    port: 25,
    secure: false,
    auth: {
        user: 'username1',
        pass: 'akatestpassword'
    }
});
this.loginfo(transporter)

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
        this.loginfo(err);
    } else {
        this.loginfo('Email sent:', info.response);
    }
});