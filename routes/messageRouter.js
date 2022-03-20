const express = require('express')
const messageController = require('../Controllers/messageController')
const router = express.Router()

router.get('/', messageController.getMessages)
router.get('/id/:id', messageController.getMessageById)
router.get('/root', messageController.getRootMessages)
router.get('/child/:parent_id', messageController.getChildMessages)
router.post('/', messageController.addMessage)

module.exports = router