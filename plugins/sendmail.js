exports.register = function() {
    const plugin = this;
    plugin.load_sender_ini();
    plugin.register_hook('queue', 'sendmail');
};

exports.load_sender_ini = function() {
    const plugin = this;
    plugin.cfg = plugin.config.get('sender.ini', {
        booleans: ['enabled']
    }, function() {
        plugin.load_sender_ini();
    });
};

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
        host: 'localhost',
        port: 25,
        secure: false,
        auth: {
            user: 'username1',
            pass: 'akatestpassword'
        }
    };

    // Send the email using the outbound module
    const envelope = {
        from: message.from,
        to: [message.to]
    };
    const email_data = `From: ${message.from}\r\nTo: ${message.to}\r\nSubject: ${message.subject}\r\n\r\n${message.body}`;
    connection.transaction.message_stream.pipe(process.stdout);
    connection.transaction.message_stream.end(email_data);
    connection.transaction.notes.outbound = {
        host: smtp_options.host,
        port: smtp_options.port,
        tls: { enabled: smtp_options.secure },
        auth: { user: smtp_options.auth.user, pass: smtp_options.auth.pass },
        mail_from: message.from,
        rcpt_to: [message.to],
        data: email_data
    };
    connection.transaction.results.add(plugin, { pass: 'Email sent successfully' });
    return next(OK);
};