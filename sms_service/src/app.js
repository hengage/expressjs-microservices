const express = require('express')
const dotenv = require('dotenv');
const { registerSuccessSMS }= require('./sms/registerSMS')

const app = express()
const PORT = 4000

dotenv.config();

registerSuccessSMS()




app.listen(PORT, () => {
    console.log('Server connected at port', PORT)
})