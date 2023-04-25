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
                const transporter = nodemailer.createTransport({
                    host: 'demo.akadigital.net',
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
                        privateKey: `-- -- - BEGIN RSA PRIVATE KEY-- -- -
                        MIICXQIBAAKBgQDwtqMrICONGCziy48LiB7340IPhaiZI5V7 + wLNLEZQiKDAoW3s
                    JWvDBOrYcRPfaoYJ9FcF0v6wzTisSNSmmzX6jTx2c / 1 NQl9BhZfrPEYB + YOVm8cn
                    HkYytWBhgzt3nz5e2IThy3PquDjiZy69hzhd73KOutNHetXMxegY7QYuZQIDAQAB
                    AoGAQqRNyEK9lPJ8es2gbLDi4f4o6 + M1KjCP0iNMQ0Feti0dVDddF2PE0dkqq4Gi
                    3 te / BEKBVTt1B73JUulW9klCR / IdvArTyasJYoZnbVALbPuDcQ8bMY7TV //uDiIR
                    NTEyUBrCi7JXNelyw66iFKmQNbA3v0otIj53zEwst345AoECQQD5oA1iscu7X8OV
                    7 GLBcaa28ohnJo + QHN2V / HPMOEpyhE + jNRQVVrL + iyNWgFGYF3trblMCt / ikOGZR
                    JR7UtIUrAkEA9txS0sPEXaSMnOfBfTCBFooaCY / gjos2JhPQl2qxbhaZLrpEKTSU
                    Rfj2INqfPZ7dF3eZJwAK8ySytBHwAfZyrwJAeJclYERcE4zTw52Kp8DrtP29f3dV
                    a11GfqqSllmrPV9FyaZeqWBU4Dr / O06KHFtbuC5305xkdZD5fMHd / wumOQJBAOI2
                    HXNjz5KcEfpKaUUl6HTWEmwGuxkEOpeD + tZ1 / 6 dI8BAgwgscUm8YZ7rNe7TE2gcC
                    IobZhC8wxs05zryNsKMCQQCP55b1i6kjEQTmXLMIJAgWUZdFOk + djWkthItG6ec +
                    nYXHTexWzxUFoJNgpjzt0juWqz4OmyN0Y9 + fbJPbPSp3
                    -- -- - END RSA PRIVATE KEY-- -- -`
                    }
                });

                // Send an email
                transporter.sendMail({
                    from: from,
                    to: to,
                    subject: subject,
                    text: text,
                    html: html
                });

            })
        }
    });
    // Nếu server chạy port 5000 thì đổi port API khác 
    // server.on('error', (err) => {
    //     if (err.code === 'EADDRINUSE') {
    //         console.log('Port 5000 is already in use, trying a different port...');
    //         server.listen(0);
    //     } else {
    //         console.error(err);
    //     }
    // });
    // Đổi port server cho API
    server.on('listening', () => {
        const address = server.address();
        console.log(`HTTP server listening on port ${address.port}`);
    });

    server.listen(1337);
};

exports.hook_rcpt = function(next, connection, params) {
    next();
};