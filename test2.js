var outbound = require('./outbound');

var plugin = this;

var to = 'phucuong200297@gmail.com';
var from = 'cuong@demo.akadigital.net';

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

};

outbound.send_email(from, to, contents, outnext);