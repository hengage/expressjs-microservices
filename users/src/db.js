const mongoose = require('mongoose')


exports.connectToDB = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect(`mongodb://127.0.0.1:27017/microservice`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log("Connection to MongoDB successful!");
    });
}
