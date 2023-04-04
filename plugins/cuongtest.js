// const http = require('http');
// const url = require('url');
// const querystring = require('querystring');
// const outbound = require('./outbound');

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

exports.register = function() {
    // Register the 'data' hook
    this.register_hook('data', 'post-to-api');
};

exports.hook_data = function(next, connection) {
    // Get the email message content
    const messageStream = connection.transaction.message_stream;
    let messageContent = '';
    messageStream.on('data', function(chunk) {
        messageContent += chunk;
    });

    messageStream.on('end', function() {
        // Make the POST request to the external API
        const postData = {
            content: messageContent
        };

        const options = {
            method: 'GET',
            hostname: 'demo.akadigital.net',
            path: '/send-mail/',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': JSON.stringify(postData).length
            }
        };

        const req = http.request(options, function(res) {
            // Handle the API response
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
                console.log('Response: ' + chunk);
            });
        });

        req.on('error', function(e) {
            // Handle the error
            console.log('Error: ' + e.message);
        });

        req.write(JSON.stringify(postData));
        req.end();

        // Call the next hook
        next();
    });
};