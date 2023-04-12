const nodemailer = require('nodemailer');

var user, pass

exports.hook_auth = function(next, connection, params) {
    // const { user, pass } = params;
    connection.notes.auth_user = user;
    connection.notes.auth_pass = pass;
    connection.loginfo(user + pass);
    next(OK);
};

const transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: pass
    }

});
exports.hook_data = function(next, connection) {
    const { transaction } = connection;
    const { header, body } = transaction;

    const message = {
        from: header.get('aka@demo.akadigital.net'),
        to: header.get('phucuong200297@gmail.com'),
        subject: header.get('Subject'),
        text: "Hello world"
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