const amqp = require('amqplib/callback_api')

const consumeQueue = (queueName, callback) => {
    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        console.log('connected to rabbitmq')
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            channel.assertQueue(queueName, {
                durable: false
            }, (error2, q) => {
                if (error2) {
                    throw error2;
                }
                channel.consume(q.queue, (message) => {
                    callback(message);
                }, {
                    noAck: true
                });
            });
        });
    });
}

module.exports = { consumeQueue }