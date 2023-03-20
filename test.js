const express = require('express');
const app = express();
const plugins = require('./plugins')

// app.get('/', (req, res) => {
//     res.send('SEND MAIL ĐI');
//     console.log("Hello ")
// });



// app.listen(5000, () => {
//     console.log('Server started on port 5000');
// });

const myClass = new Plugin();
myClass();