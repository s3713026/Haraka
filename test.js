const express = require('express');
const app = express();
// const haraka = require('haraka');

// Define the API endpoint
// app.post('/api/send-email', (req, res) => {
//     // Validate the input data
//     const { from, to, subject, body } = req.body;
//     if (!from || !to || !subject || !body) {
//         res.status(400).send('Missing required fields');
//         return;
//     }

//     // Call the Haraka plugin function
//     // const plugin = haraka.plugin('sendmail');
//     // plugin.sendEmail(from, to, subject, body);
//     console.log("RUN API")
//         // Send a success response
//     res.status(200).send('Email sent successfully');
// });

const bodyParser = require('body-parser');
app.use(bodyParser.json());

let items = [];

app.get('/items', (req, res) => {
    res.json(items);
});

app.post('/items', (req, res) => {
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
});

app.listen(5000, () => {
    console.log('Server started on port 3000');
});