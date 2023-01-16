const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
},
    { timestamps: true }
)

UserSchema.statics.getUserById = function (userId, selectFields) {
    return new Promise((resolve, reject) => {
        console.log({ userId })
        this.findOne({ userId }, (err, docs) => {
            if (err) {
                console.log({ err })
                return reject(err)
            }
            resolve(docs)
        })
            .lean()
            .select(selectFields)
    })
}


module.exports = mongoose.model('User', UserSchema);