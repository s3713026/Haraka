// const http = require('http');
// const url = require('url');
// const querystring = require('querystring');
const outbound = require('./outbound');

// //Xác định plugin: 
// //Xác định plugin bằng cách sử dụng hàm export.register. 
// //Hàm này có hai tham số: tên plugin và chức năng xác định hành vi của plugin.
// // exports.register = function() {
// //     // this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
// //     const server = http.createServer(function(req, res) {
// //         const parsedUrl = url.parse(req.url);
// //         const parsedQuery = querystring.parse(parsedUrl.query);
// //         // Plugin code for handling the POST request here
// //     });

// //     server.listen(5000);
// // };

// exports.hook_data = function(next, connection) {
//     const messageStream = connection.transaction.message_stream;

//     let messageContent = '';
//     messageStream.on('data', function(chunk) {
//         messageContent += chunk;
//     });

//     messageStream.on('end', function() {
//         const postData = {
//             content: messageContent
//         };

//         const options = {
//             method: 'POST',
//             hostname: 'localhost',
//             path: '/send-mail',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Content-Length': JSON.stringify(postData).length
//             }
//         };

//         const req = http.request(options, function(res) {
//             // Handle the API response
//             console.log(res.body);

//             const from = req.body.from;
//             const to = req.body.to;
//             const subject = req.body.subject;
//             const body = req.body.body;
//             //    var from = 'sender@demo.akadigital.net';
//             //    var to = 'phucuong200297@gmail.com';
//             //    var subject = 'Test Email C++';
//             //    var body = 'This is a test email message.';
//             const message = [
//                 "From: " + from,
//                 "To: " + to,
//                 "MIME-Version: 1.0",
//                 "Content-type: text/plain; charset=us-ascii",
//                 "Subject: " + subject,
//                 "",
//                 body,
//                 ""
//             ].join("\n");

//             outbound.send_email(from, to, message, (err, result) => {
//                 if (err) {
//                     console.error('Error sending email:', err);
//                     res.status(500).send('Error sending email');
//                 } else {
//                     console.log('Email sent successfully:', result);
//                     res.status(200).send('Email sent successfully');
//                 }
//             });
//         });

//         req.on('error', function(e) {
//             // Handle the error
//         });

//         // req.write(JSON.stringify(postData));
//         req.end();

//         next();
//     });
// };



// //Khi Haraka nhận được email, hàm hook_data_post được gọi và chi tiết email được ghi vào tệp.
// // exports.hook_data_post = function(next, connection) {
// //     // send mail with defined transport object
// //     const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
// //     this.logfile.write(logline + '\n');
// //     next();
// // };

const http = require('http');
const { stringify } = require('querystring');


exports.register = function() {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');



        if (req.method === 'POST' && req.url === '/api/send-email') {
            res.end(stringify(req));
            // var from = 'sender@demo.akadigital.net';
            // var to = 'phucuong200297@gmail.com';
            // var subject = 'Test Email C';
            // var body = 'This is a test email message.';


            // var contents = [
            //     "From: " + from,
            //     "To: " + to,
            //     "MIME-Version: 1.0",
            //     "Content-type: text/plain; charset=us-ascii",
            //     "Subject:" + subject,
            //     "",
            //     body,
            //     ""
            // ].join("\n");

            // outbound.send_email(from, to, contents);
            //     let body = '';
            //     req.on('data', (chunk) => {
            //         body += chunk.toString();
            //     });
            //     req.on('end', async() => {
            //         try {
            //             const data = JSON.parse(body);
            //             const { from, to, subject, text } = data;


            //             const message = [
            //                 "From: " + from,
            //                 "To: " + to,
            //                 "MIME-Version: 1.0",
            //                 "Content-type: text/plain; charset=us-ascii",
            //                 "Subject: " + subject,
            //                 "",
            //                 text,
            //                 ""
            //             ].join("\n");

            //             outbound.send_email(from, to, message, (err, result) => {
            //                 if (err) {
            //                     console.error('Error sending email:', err);
            //                     res.status(500).send('Error sending email');
            //                 } else {
            //                     console.log('Email sent successfully:', result);
            //                     res.status(200).send('Email sent successfully');
            //                 }
            //             });

            //             console.log(`Email sent: ${info.messageId}`);
            //             res.writeHead(200, { 'Content-Type': 'text/plain' });
            //             res.end('OK\n');
            //         } catch (err) {
            //             console.error(err);
            //             res.writeHead(500, { 'Content-Type': 'text/plain' });
            //             res.end('Internal server error\n');
            //         }
            //     });
            // } else {
            //     res.writeHead(404, { 'Content-Type': 'text/plain' });
            //     res.end('Not found\n');
        }
    });

    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log('Port 5000 is already in use, trying a different port...');
            server.listen(0);
        } else {
            console.error(err);
        }
    });

    server.on('listening', () => {
        const address = server.address();
        console.log(`HTTP server listening on port ${address.port}`);
    });

    server.listen(5000);
};

exports.hook_rcpt = function(next, connection, params) {
    next();
};