const messageRepo = require('../datalayers/messageRepo')

// get messages by params
const getMessages = async(req, res) => {
    let response = null

    if (req.query.id) { //if id is present
        response = await messageRepo.getMessageById(req.query.id)
    }
    else {
        response = await messageRepo.getMessages(req.query.limit, req.query.offset, req.query.search)
    }

    res.status(200).json(response)
}

// get message by id 
const getMessage = async(req, res) => {
    
}

// create a new message object
const addMessage = async(req, res) => {

    if (!req.body.content) throw new Error('Message content missing!')

    // create parent message object
    if (!req.body.parent_id) {
        const response = await messageRepo.addRootMessage(req.body.content, req.body.image_url)
        res.status(201).json(response)
        return
    }

    const response = await messageRepo.addChildMessage(req.body.content, req.body.img_url, req.body.parent_id)
    res.status(201).json(response)
}

module.exports = {
    getMessages, addMessage
}