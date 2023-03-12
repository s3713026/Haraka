const fs = require('fs');

//Xác định plugin: 
//Xác định plugin bằng cách sử dụng hàm export.register. 
//Hàm này có hai tham số: tên plugin và chức năng xác định hành vi của plugin.
exports.register = function() {
    this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
};

//Khi Haraka nhận được email, hàm hook_data_post được gọi và chi tiết email được ghi vào tệp.
exports.hook_data_post = function(next, connection) {
    // send mail with defined transport object
    const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
    this.logfile.write(logline + '\n');
    next();
};

// swaks --to cuong.truong@akadigital.vn --from test@akadigital.net --server localhost   --port 25 --auth-user username1 --auth-password akatestpassword