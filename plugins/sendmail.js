const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 465,
    secure: true,

});

exports.hook_data = function(next, connection) {
    const { transaction } = connection;
    const { header, body } = transaction;

    const message = {
        from: header.get('aka@demo.akadigital.net'),
        to: header.get('phucuong200297@gmail.com'),
        subject: header.get('Subject'),
        text: body
    };

    transporter.sendMail(message, function(error, info) {
        if (error) {
            console.log(error);
            return next(DENYSOFT, 'Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            return next();
        }
    });
};