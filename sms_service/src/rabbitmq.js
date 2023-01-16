const amqp = require('amqplib/callback_api')
const { registerSuccessSMS } = require('./sms/registerSMS')

const messageQueue = () => {
    const amqp = require('amqplib/callback_api');

    amqp.connect('amqp://localhost', (error0, connection) => {
        if (error0) {
            throw error0;
        }
        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }
            const queue = 'new_user_queue';
    
            channel.assertQueue(queue, {
                durable: false
            });
    
            console.log(`Waiting for messages in ${queue}`);
    
            channel.consume('user.register', (message) => {
                // extract the user details from the message
                const data = JSON.parse(message.content.toString());
                const { phoneNumber, username } = data.newUser;
                console.log({data})
                console.log({username})

                // use the user details to send the SMS
                registerSuccessSMS(phoneNumber, username);
                console.log(" [x] Received %s", message.content.toString());
            }, {
                noAck: true
            });
        });
    });
    
}


module.exports = { messageQueue }