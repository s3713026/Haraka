const fs = require('fs');

exports.register = function() {
    this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
};

exports.hook_data_post = function(next, connection) {
    const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
    this.logfile.write(logline + '\n');
    next();
};