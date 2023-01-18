const express = require('express')

const dotenv = require('dotenv');

const {consumeQueue} = require('./messageQueue');
const eventEmitter = require('./events')

const app = express()
const PORT = 4000

dotenv.config();


consumeQueue("userQueue", (message) => {
    const data = JSON.parse(message.content.toString());

    switch (data.type) {
        case 'user.register':
            eventEmitter.emit('register.user', data);
            break;
    
        default:
            break;
    }
});


app.listen(PORT, () => {
    console.log('Server connected at port', PORT)
})