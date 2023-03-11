const fs = require('fs');

exports.register = function() {
    this.logfile = fs.createWriteStream('Haraka/swaks.log', { flags: 'a' });
};

exports.hook_data_post = function(next, connection) {
    const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
    this.logfile.write(logline + '\n');
    next();
};