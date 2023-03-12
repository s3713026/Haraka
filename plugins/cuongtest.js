const fs = require('fs');
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'demo.akadigital.net',
    port: 25,
    secure: true, // true for 465, false for other ports
});
let mailOptions = {
    from: 'cuong.test@demo.akadigital.net', // sender address
    to: 'cuong.truong@akadigital.vn', // list of receivers
    subject: 'Hello from Haraka!', // Subject line
    text: 'Hello world!', // plain text body
    html: '<b>Hello world!</b>' // html body
};

//Xác định plugin: 
//Xác định plugin bằng cách sử dụng hàm export.register. 
//Hàm này có hai tham số: tên plugin và chức năng xác định hành vi của plugin.
exports.register = function() {
    this.logfile = fs.createWriteStream('swaks.log', { flags: 'a' });
};

//Khi Haraka nhận được email, hàm hook_data_post được gọi và chi tiết email được ghi vào tệp.
exports.hook_data_post = function(next, connection) {
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Message sent: %s', info.messageId);
        }
    });
    const logline = `Date: ${new Date().toString()}, From: ${connection.transaction.mail_from}, To: ${connection.transaction.rcpt_to}`;
    this.logfile.write(logline + '\n');
    next();
};

// swaks --to cuong.truong@akadigital.vn --from test@akadigital.net --server localhost   --port 25 --auth-user username1 --auth-password akatestpassword