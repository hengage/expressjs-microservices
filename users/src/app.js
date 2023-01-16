const express = require('express')
const app = express()
const mongoose = require('mongoose');
const router = require('./routes')

const PORT = 3000


mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://127.0.0.1:27017/microservice`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connection to MongoDB successful!");
});

app.use(express.urlencoded({extended:false}))
.use(express.json());

app.use('/api', router)

app.listen( PORT, ()=> console.log(
    'Server started at port', PORT
))