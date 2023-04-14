const nodemailer = require('nodemailer');

exports.register = function() {
    this.logdebug("registering the sendMail plugin");

    this.register_hook('queue', 'sendMail');
}

exports.sendMail = function(next, connection) {
    const body = connection.transaction.body;

    let transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'cuong.truong@akadigital.vn', // your email address
            pass: 'password3' // your email password
        }
    });
    su

    let mailOptions = {
        from: 'aka@demo.akadigital.net', // sender address
        // to: body.header.to, // recipient address
        // subject: body.header.subject, // Subject line
        // text: body.bodytext, // plain text body
        // html: body.bodytext // html body
        to: 'phucuong200297@gmail.com',
        subject: 'Cái này để test',
        text: 'bodymail nè'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            this.logerror(error);
            return next(DENY, "Error sending email");
        }
        this.loginfo('Message sent: %s', info.messageId);
        return next(OK);
    });
};