
const User = require('./model')
const { messageQueue } = require('./rabbitmq')


const register = async (req, res) => {
    try {
        const newUser = new User(req.body)
        // console.log({newUser})
        await newUser.save()
        res.status(201).json({
             message: 'User successfully registered', newUser 
        })
        messageQueue('userQueue', {newUser, type: 'user.register'})
    } catch (error) {
        console.error({error})
        return res.status(500).json({message: error})
    }
    
}

module.exports = {register};