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

var contents = [
    "From: " + from,
    "To: " + to,
    "MIME-Version: 1.0",
    "Content-type: text/plain; charset=us-ascii",
    "Subject: Some subject here",
    "",
    "Some email body here",
    ""
].join("\n");

outbound.send_email(from, to, contents);
// Send the email using outbound.sendmail
// outbound.send_email(from, to, email, function(err, res) {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Email sent successfully:', res);
//     }
// });