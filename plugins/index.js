const sendMail = require('./sendMail');

exports.hook_listen = function(next, connection) {
    // Call the sendMail function when the server starts listening
    sendMail();
    next();
};