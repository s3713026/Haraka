const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const outbound = require('./outbound');

//Xác định plugin: 
//Xác định plugin bằng cách sử dụng hàm export.register. 
//Hàm này có hai tham số: tên plugin và chức năng xác định hành vi của plugin.
exports.register = function() {
    // this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
    this.hook_init_http();
};

//Khi Haraka nhận được email, hàm hook_data_post được gọi và chi tiết email được ghi vào tệp.
// exports.hook_data_post = function(next, connection) {
//     // send mail with defined transport object
//     const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
//     this.logfile.write(logline + '\n');
//     next();
// };

exports.hook_init_http = function(next, server) {
    server.http.app.post('/send-mail/', (req, res) => {

        console.log(req.body);

        const from = req.body.from;
        const to = req.body.to;
        const subject = req.body.subject;
        const body = req.body.body;
        //    var from = 'sender@demo.akadigital.net';
        //    var to = 'phucuong200297@gmail.com';
        //    var subject = 'Test Email C++';
        //    var body = 'This is a test email message.';
        const message = [
            "From: " + from,
            "To: " + to,
            "MIME-Version: 1.0",
            "Content-type: text/plain; charset=us-ascii",
            "Subject: " + subject,
            "",
            body,
            ""
        ].join("\n");

        outbound.send_email(from, to, message, (err, result) => {
            if (err) {
                console.error('Error sending email:', err);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent successfully:', result);
                res.status(200).send('Email sent successfully');
            }
        });
    });

    this.loginfo('watch init_http done');
    next();
}