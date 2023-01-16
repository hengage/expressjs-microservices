const express = require('express')
const { messageQueue } = require('./rabbitmq')
const dotenv = require('dotenv');

const app = express()
const PORT = 4000

dotenv.config();
messageQueue()




app.listen(PORT, () => {
    console.log('Server connected at port', PORT)
})