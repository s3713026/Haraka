exports.hook_data = function(next, connection) {
    // Generate a new Message-Id
    var newMessageId = '<' + 'akadigital2023@' + connection.notes.hostName + 'akadigital.net' + '>';
    // Modify the headers
    connection.transaction.message_id = newMessageId;
    connection.transaction.remove_header('Message-Id');
    connection.transaction.add_header('Message-Id', newMessageId);

    // Continue processing
    next();
};