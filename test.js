const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const outbound = require('./outbound');

app.use(bodyParser.json());

app.post('/send-email', (req, res) => {
    const from = req.body.from;
    const to = req.body.to;
    const subject = req.body.subject;
    const body = req.body.body;

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

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});