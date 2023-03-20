var outbound = require('./outbound');

exports.hook_queue_outbound = function(next, connection) {
    const tx = connection.transaction;

    // Set up the email headers
    tx.message.header.add('From', 'sender@demo.akadigital.net');
    tx.message.header.add('To', 'phucuong200297@gmail.com');
    tx.message.header.add('Subject', 'Hello world');

    // Send the email using the outbound plugin
    const plugin = this;
    plugin.logdebug('Sending outbound email');
    plugin.outbound.send_email(tx, function(err, out_message) {
        if (err) {
            plugin.logerror(`Error sending email: ${err}`);
            return next();
        }
        plugin.loginfo('Email sent successfully');
        return next(OK);
    });
};