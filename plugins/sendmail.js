const outbound = require('./outbound');

const from = 'sender@demo.akadigital.net';
const to = 'phucuong200297@gmail.com';
const subject = 'Test Email';
const body = 'This is a test email message.';

const email = {
    from: from,
    to: to,
    subject: subject,
    body: body
};

// Send the email using outbound.sendmail
outbound.send_email('sendmail', email, function(err, res) {
    if (err) {
        console.error(err);
    } else {
        console.log('Email sent successfully:', res);
    }
});