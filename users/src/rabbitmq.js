const amqp = require('amqplib/callback_api')


const messageQueue = (queuename, message) => {
    amqp.connect('amqp://localhost:5672', function (error0, connection) {
        if (error0) {
            throw error0;
        }

        // Create a channel
        connection.createChannel(async function (error1, channel) {
            if (error1) {
                throw error1;
            }

            // Declare a queue
            channel.assertQueue(queuename, {
                durable: true
            });

            channel.sendToQueue(queuename, Buffer.from(JSON.stringify(message)));
            console.log('Message sent:', message)
            // setTimeout( () => {
            //     connection.close();
            //     process.exit(0)
            // }, 500);
        });
    });
}


module.exports = { messageQueue }