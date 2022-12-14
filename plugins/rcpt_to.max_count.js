// Implement a maximum number of recipients per mail
// this helps guard against some spammers who send RCPT TO a gazillion times
// as a way of probing for a working address

// Consider using the karma plugin. It supports limiting the number
// of recipients based on past behavior (good, bad, unknown)

exports.hook_rcpt = function (next, connection = {}) {
    const { notes } = connection.transaction

    if (notes?.rcpt_to_count) {
        notes.rcpt_to_count++;
    }
    else {
        notes.rcpt_to_count = 1;
    }

    const max_count = this.config.get('rcpt_to.max_count') || 40;

    if (notes.rcpt_to_count > max_count) {
        return next(DENYDISCONNECT, "Too many recipient attempts");
    }
    return next();
}
