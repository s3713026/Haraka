const nodemailer = require('nodemailer');
const tls = require('node:tls')
exports.plugins = {
    myplugin: { tls }
}
const transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 25,
    secure: false,
    auth: {
        user: 'username1',
        pass: 'akatestpassword',
    },
});

const message = {
    from: 'me@demo.akadigital.net',
    to: 'phucuong200297@gmail.com',
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