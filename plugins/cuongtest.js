const outbound = require('./outbound');
const mailcomposer = require('mailcomposer');
const http = require('http');
const { stringify } = require('querystring');


exports.register = function() {
    const server = http.createServer((req, res) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        if (req.method === 'POST' && req.url === '/api/send-email') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', async() => {
                const data = JSON.parse(body);
                const { from, to, subject, text, html } = data;
                res.end(stringify(data));
                // const message = [
                //     "From: " + from,
                //     "To: " + to,
                //     "MIME-Version: 1.0",
                //     "Content-type: text/plain; charset=us-ascii",
                //     "Subject: " + subject,
                //     "",
                //     text,
                //     html,
                //     ""
                // ].join("\n");

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
                // const message = mailcomposer({
                //     from: from,
                //     to: to,
                //     subject: subject
                //     text: text,
                //     html: html
                // });
                // const messageStream = message.build();

                // const messageOptions = {
                //     from: from,
                //     to: to,
                //     subject: 'Subject of the email',
                //     html: html,
                //     // message_stream: messageStream
                // };



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