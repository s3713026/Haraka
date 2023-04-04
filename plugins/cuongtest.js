const http = require('http');
const url = require('url');
const querystring = require('querystring');
const outbound = require('./outbound');

//Xác định plugin: 
//Xác định plugin bằng cách sử dụng hàm export.register. 
//Hàm này có hai tham số: tên plugin và chức năng xác định hành vi của plugin.
exports.register = function() {
    // this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
    const server = http.createServer(function(req, res) {
        const parsedUrl = url.parse(req.url);
        const parsedQuery = querystring.parse(parsedUrl.query);
        // Plugin code for handling the POST request here
    });

    server.listen(5000);
};
exports.hook_data = function(next, connection) {
    // Plugin code for handling the DATA command here
    const options = {
        hostname: 'localhost',
        port: 5000, // Replace 8000 with the port number of your HTTP server
        path: '/send-mail/', // Replace with the URL of your POST endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
            'Content-Length': Buffer.byteLength(connection.transaction.body),
        },
    };

    const req = http.request(options, function(res) {
        // Plugin code for handling the HTTP response here
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

    req.write(connection.transaction.body);
    req.end();
};

// exports.hook_queue = function(next, connection) {
//     // Plugin code for handling the message queue here
//     const self = this;
//     const transaction = connection.transaction;

//     transaction.message_stream.pipe(concat(function(body) {
//         // Plugin code for handling the message body here
//         const success = true; // Replace with your own logic to determine if the POST request was successful
//         if (success) {
//             transaction.message_stream.destroy();
//             self.loginfo('Message sent successfully');
//             return next(OK);
//         }
//         return next();
//     }));

// };
//Khi Haraka nhận được email, hàm hook_data_post được gọi và chi tiết email được ghi vào tệp.
// exports.hook_data_post = function(next, connection) {
//     // send mail with defined transport object
//     const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
//     this.logfile.write(logline + '\n');
//     next();
// };