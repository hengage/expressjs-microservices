const router = require('express').Router()
const controller = require('./controller')


router.post('/user/register', controller.register)

module.exports = router;