const smtp_client = require('smtp_client');

exports.sendmail = function(next, connection, params) {
    const plugin = this;

    // Set up the email headers and content
    const message = {
        from: 'sender@demo.akadigital.net',
        to: 'phucuong200297@gmail.com',
        subject: 'Test email',
        body: 'This is a test email'
    };

    // Set up the SMTP client options
    const smtp_options = {
        host: 'demo.akadigital.net',
        port: 25,
        secure: false,
        auth: {
            user: 'username1',
            pass: 'akademopassword'
        }
    };

    // Send the email using the SMTP client
    smtp_client.connect(smtp_options, function(err, client) {
        if (err) {
            plugin.logerror(`Error connecting to SMTP server: ${err}`);
            return next();
        }
        client.useEnvelope({
            from: message.from,
            to: message.to
        });
        client.addData(`Subject: ${message.subject}\r\n\r\n${message.body}`);
        client.end(function(err) {
            if (err) {
                plugin.logerror(`Error sending email: ${err}`);
                return next();
            }
            plugin.loginfo('Email sent successfully');
            return next(OK);
        });
    });
};