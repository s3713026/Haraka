const outbound = require('./outbound');
// sử dụng để chạy API bằng http 
const http = require('http');
const { stringify } = require('querystring');


exports.register = function(next, connection) {
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
                var newMessageId = '<' + 'akadigital2023@' + connection.notes.hostName + 'akadigital.net' + '>';
                connection.transaction.message_id = newMessageId;
                connection.transaction.remove_header('Message-Id');
                connection.transaction.add_header('Message-Id', newMessageId);
                const message = [
                    "From: " + from,
                    "To: " + to,
                    "MIME-Version: 1.0",
                    "Content-type: text/html; charset=utf-8",
                    "Content-Transfer-Encoding: quoted-printable",
                    "Subject: " + subject,
                    "",
                    text,
                    html,
                    ""
                ].join("\n");

                // Gửi mail bằng outboud.send_email
                outbound.send_email(from, to, message, (err, result) => {
                    if (err) {
                        console.error('Error sending email:', err);
                        res.end('Error sending email');
                    } else {
                        console.log('Email sent successfully:', result);
                        res.end('Email sent successfully');
                    }
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