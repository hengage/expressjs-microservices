const EventEmitter = require('events');
const eventEmitter = new EventEmitter();

const { registerSuccessSMS } = require('./sms/registerSMS')



// eventEmitter.on("register.user", registerSuccessSMS);
eventEmitter.on("register.user", (data) => {
    registerSuccessSMS(data);
});


module.exports = eventEmitter;