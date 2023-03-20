const express = require('express');
const { send_email } = require('./outbound');
const app = express();
const plugins = require('./plugins')

plugins.load_plugin(send_email);

// app.get('/', (req, res) => {
//     res.send('SEND MAIL ĐI');
//     console.log("Hello ")
// });



// app.listen(5000, () => {
//     console.log('Server started on port 5000');
// });