const outbound = require('./outbound');

// const from = 'sender@demo.akadigital.net';
// const to = 'phucuong200297@gmail.com';
// const subject = 'Test Email';
// const body = 'This is a test email message.';

var from = 'sender@demo.akadigital.net';
var to = 'phucuong200297@gmail.com';
var subject = 'Test Email C';
var body = 'This is a test email message.';


var contents = [
    "From: " + from,
    "To: " + to,
    "MIME-Version: 1.0",
    "Content-type: text/plain; charset=us-ascii",
    "Subject:" + subject,
    "",
    body,
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