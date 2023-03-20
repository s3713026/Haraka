const express = require('express');
const app = express();
const plugin = require('./plugins')

// app.get('/', (req, res) => {
//     res.send('SEND MAIL ĐI');
//     console.log("Hello ")
// });



// app.listen(5000, () => {
//     console.log('Server started on port 5000');
// });

plugins.run_hooks('connect_init');