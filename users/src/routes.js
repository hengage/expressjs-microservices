const router = require('express').Router()
const controller = require('./controller')


router.post('/hello', controller.register)

module.exports = router;