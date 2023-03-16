var outbound = require('./outbound');

var plugin = this;

var to = 'phucuong200297@gmail.com';
var from = 'haraka@demo.akadigital.net';

var contents = [
    "From: " + from,
    "To: " + to,
    "MIME-Version: 1.0",
    "Content-type: text/plain; charset=us-ascii",
    "Subject: Some subject here",
    "",
    "Some email body here",
    ""
].join("\n");

var outnext = function(code, msg) {
    switch (code) {
        case DENY:
            plugin.logerror("Sending mail failed: " + msg);
            break;
        case OK:
            plugin.loginfo("mail sent");
            next();
            break;
        default:
            plugin.logerror("Unrecognized return code from sending email: " + msg);
            next();
    }
};

outbound.send_email(from, to, contents, outnext);