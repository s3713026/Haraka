// Load required modules
const SMTPClient = require('smtp-client').SMTPClient;

// Define plugin function
exports.register = function() {
    // Initialize plugin
    const plugin = this;

    // Define delivery function
    function deliver_recipient(next, connection, params) {
        const rcpt = params[0];
        const message = connection.transaction.message;

        // Create SMTP client
        const client = new SMTPClient({
            host: rcpt.host,
            port: rcpt.port || 25,
            ssl: rcpt.secure || false,
            auth: {
                user: rcpt.user,
                pass: rcpt.pass,
            },
        });

        // Set up event handlers
        client.on('error', (error) => {
            connection.logerror(`Error delivering to ${rcpt.address}: ${error}`);
            next(DENYSOFT, `Error delivering to ${rcpt.address}: ${error}`);
        });

        client.on('ready', () => {
            client.useEnvelope({
                from: message.header.headers.from,
                to: rcpt.address,
            });
            client.startData(() => {
                client.write(message.body);
                client.end(() => {
                    connection.loginfo(`Delivered to ${rcpt.address}`);
                    next(OK);
                });
            });
        });

        // Connect to server
        client.connect(() => {
            connection.logdebug(`Connected to ${rcpt.host}:${rcpt.port}`);
        });
    }

    // Register plugins
    plugin.register_hook('rcpt', 'outbound', deliver_recipient);
};