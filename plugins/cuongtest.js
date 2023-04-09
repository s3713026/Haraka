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
                const mail = mailcomposer({
                    from: from,
                    to: to,
                    subject: subject,
                    text: text,
                    html: html
                });
                const messageStream = mail.build();

                const messageOptions = {
                    from: from,
                    to: recipient,
                    subject: 'Subject of the email',
                    html: html,
                    message_stream: messageStream
                };


                // outbound.send_email(from, to, message, (err, result) => {
                //     if (err) {
                //         console.error('Error sending email:', err);
                //         res.end('Error sending email');
                //     } else {
                //         console.log('Email sent successfully:', result);
                //         res.end('Email sent successfully');
                //     }
                // });
                outbound.send_email(messageOptions, (err, res) => {
                    if (err) {
                        plugin.logerror(`Error sending email: ${err}`);
                    } else {
                        plugin.loginfo(`Email sent: ${res}`);
                    }
                })
            })



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