const net = require('net');

// Define the email data
const from = 'sender@example.com';
const to = 'recipient@example.com';
const subject = 'Test Email';
const body = 'This is a test email from Haraka server.';

// Create the SMTP client connection
const client = net.connect({ host: 'smtp.example.com', port: 587 }, () => {
    console.log('Connected to SMTP server');

    // Send the HELO command
    client.write('HELO example.com\r\n');

    // Send the STARTTLS command (if using SSL/TLS)
    // client.write('STARTTLS\r\n');

    // Send the AUTH LOGIN command (if authentication is required)
    // client.write('AUTH LOGIN\r\n');

    // Send the username and password (if using AUTH LOGIN)
    // client.write(Buffer.from('username').toString('base64') + '\r\n');
    // client.write(Buffer.from('password').toString('base64') + '\r\n');

    // Send the MAIL FROM command
    client.write(`MAIL FROM:<${from}>\r\n`);

    // Send the RCPT TO command
    client.write(`RCPT TO:<${to}>\r\n`);

    // Send the DATA command
    client.write('DATA\r\n');

    // Send the email headers and body
    client.write(`From: ${from}\r\n`);
    client.write(`To: ${to}\r\n`);
    client.write(`Subject: ${subject}\r\n`);
    client.write('\r\n');
    client.write(body);
    client.write('\r\n.\r\n');

    // Send the QUIT command
    client.write('QUIT\r\n');
});

// Handle incoming data from the SMTP server
client.on('data', (data) => {
    console.log(data.toString());
});

// Handle errors
client.on('error', (err) => {
    console.error(err);
});

// Handle the end of the connection
client.on('end', () => {
    console.log('Disconnected from SMTP server');
});