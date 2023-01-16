const express = require('express')
const app = express()
const { connectToDB } = require('./db');
const router = require('./routes')

const PORT = 3000

//Connect to db
connectToDB()

app.use(express.urlencoded({extended:false}))
.use(express.json());

app.use('/api', router)

app.listen( PORT, ()=> console.log(
    'Server started at port', PORT
))