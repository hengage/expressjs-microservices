const amqp = require('amqplib/callback_api');

const consumeQueue = (queueName, callback) => {
    amqp.connect(process.env.RABBITMQ_URL, (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queueName, {
                durable: true
            });
            console.log(`Waiting for messages in ${queueName}. To exit press CTRL+C`);
            channel.consume(queueName, (message) => {
                callback(message);
            }, {
                noAck: true
            });
        });
    });
}

module.exports = { consumeQueue }
