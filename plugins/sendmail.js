const nodemailer = require('nodemailer');


// const outbound = require('./outbound');
// sử dụng để chạy API bằng http 
const http = require('http');
const { stringify } = require('querystring');
const fs = require("fs");


exports.register = function() {
    //Tạo server cho API gửi email
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        // res.setHeader('Content-Type', 'text/plain');
        res.setHeader('Content-Type', 'text/x-amp-html');
        // Khi Api post và có source là /api/send-email thì gửi mail
        if (req.method === 'POST' && req.url === '/api/send-email') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async() => {
                const data = JSON.parse(body);
                const { from, to, subject, text, html } = data;
                res.end(stringify(data));
                // Messeage gửi mail với thông tin từ API
                const transporter = nodemailer.createTransport({
                    host: 'localhost',
                    port: 25,
                    secure: false,
                    auth: {
                        user: 'username1',
                        pass: 'akatestpassword'
                    },
                    secureConnection: true,
                    tls: {
                        rejectUnauthorized: false
                    },
                    dkim: {
                        domainName: "demo.akadigital.net",
                        keySelector: "aka",
                        privateKey: fs.readFileSync("./config/private.key")
                    }
                });
                const recipients = [to];
                // Send an email
                for (let i = 0; i < recipients.length; i++) {
                    // Send the mail
                    transporter.sendMail({
                        from: from,
                        to: recipients[i],
                        subject: subject,
                        text: text,
                        html: html
                    });
                }


            })
        }
    });
    // Nếu server chạy port 5000 thì đổi port API khác 
    server.on('error', (err) => {
        if (err.code === 'EADDRINUSE') {
            console.log('Port 5000 is already in use, trying a different port...');
            server.listen(0);
        } else {
            console.error(err);
        }
    });
    // Đổi port server cho API
    server.on('listening', () => {
        const address = server.address();
        console.log(`HTTP server listening on port ${address.port}`);
    });

    server.listen(5000);
};

exports.hook_rcpt = function(next, connection, params) {
    next();
};