const outbound = require('./outbound');
const api = require('..test/');

// const from = 'sender@demo.akadigital.net';
// const to = 'phucuong200297@gmail.com';
// const subject = 'Test Email';
// const body = 'This is a test email message.';

var from = 'sender@demo.akadigital.net';
var to = 'phucuong200297@gmail.com';
var subject = 'Test Email';
var body = 'This is a test email message.';

exports.hook_data = function(next, connection) {
    api.myFunction(); // Call the exported function from the API file
    // Do other stuff here
    next();
};

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