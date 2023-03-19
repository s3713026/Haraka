const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: '158.101.137.14',
    port: 25,
    secure: false,
    auth: {
        user: 'username1',
        pass: 'akatestpassword',
    },
});

const message = {
    from: 'me@demo.akadigital.net',
    to: 'phucuong@200297@gmail.com',
    subject: 'Hello',
    text: 'Hello, world!',
};

transporter.sendMail(message, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Message sent: ${info.messageId}`);
    }
});