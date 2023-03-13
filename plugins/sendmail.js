const nodemailer = require('nodemailer');

exports.register = function() {
    this.register_hook('queue', 'send_email');
}

exports.send_email = function(next, connection) {
    // var mail_from = connection.transaction.mail_from;
    // var rcpt_to = connection.transaction.rcpt_to;
    // var body = connection.transaction.message_stream.get_data();

    var transporter = nodemailer.createTransport({
        host: 'demo.akadigital.net',
        port: 25,
        secure: true,
        auth: {
            user: 'cuong@demo.akadigital.com',
            pass: 'password2'
        }
    });

    var mailOptions = {
        from: 'mail_from@demo.akadigital',
        to: 'cuong.truong@akadigital.vn',
        subject: 'Test email from Haraka',
        text: 'body'
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    next();
}