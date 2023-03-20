const smtp_client = require('smtp-client');

exports.hook_queue_outbound = function(next, connection) {
    // Use the smtp_client plugin to send the email
    const plugin = this;

    const tx = connection.transaction;
    const options = {
        host: 'localhost',
        port: 25,
        tls: true,
        auth: {
            user: 'username1',
            pass: 'akatestpassword'
        }
    };

    // Set up the email headers
    tx.message.header.add('From', 'sender@demo.akadigital.net');
    tx.message.header.add('To', 'phucuong200297@gmail.com');
    tx.message.header.add('Subject', 'Hello world');

    // Send the email
    smtp_client.get_client_plugin(plugin, connection, options, function(err, client) {
        if (err) {
            plugin.logerror(`Error connecting to SMTP server: ${err}`);
            return next();
        }

        client.send(tx.message, function(err, info) {
            if (err) {
                plugin.logerror(`Error sending email: ${err}`);
                return next();
            }

            plugin.loginfo(`Email sent successfully: ${info.response}`);
            return next(OK);
        });
    });
};