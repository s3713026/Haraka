const nodemailer = require('nodemailer');


// const outbound = require('./outbound');
// sử dụng để chạy API bằng http 
const http = require('http');
const { stringify } = require('querystring');
const harakaTransport = require('nodemailer-haraka-transport');


exports.register = function() {
    //Tạo server cho API gửi email
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
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
                const transporter = nodemailer.createTransport(harakaTransport({
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
                        domainName: 'demo.akadigital.net',
                        keySelector: 'aka',
                        privateKey: 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDwtqMrICONGCziy48LiB7340IPhaiZI5V7+wLNLEZQiKDAoW3sJWvDBOrYcRPfaoYJ9FcF0v6wzTisSNSmmzX6jTx2c/1NQl9BhZfrPEYB+YOVm8cnHkYytWBhgzt3nz5e2IThy3PquDjiZy69hzhd73KOutNHetXMxegY7QYuZQIDAQAB'
                    }
                }));

                // Send an email
                transporter.sendMail({
                    from: 'sender@demo.akadigital.net',
                    to: 'phucuong200297@gmail.com',
                    subject: 'Server is running',
                    text: 'The Haraka server has started.'
                });

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