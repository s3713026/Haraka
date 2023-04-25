const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const fs = require('fs')


app.post('/api/send-email', (req, res) => {

    res.setHeader('Content-Type', 'text/plain');
    const transporter = nodemailer.createTransport({
        host: 'demo.akadigital.net',
        port: 80,
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

    const mailOptions = {
            from: 'aka@demo.akadigital.net',
            to: 'phucuong200297@gmail.com',
            subject: 'OK',
            text: 'OK'
        }
        // Send an email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});