const express = require('express')
const messageController = require('../Controllers/messageController')
const router = express.Router()

router.get('/', messageController.getMessages)
router.post('/', messageController.addMessage)

module.exports = router