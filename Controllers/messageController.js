const messageRepo = require('../datalayers/messageRepo')

// get messages by filters
const getMessages = async(req, res) => {
    let response = null
    if (req.query.id) response = await messageRepo.getMessageById(req.query.id)
    else response = await messageRepo.getMessages(req.query.limit, req.query.offset, req.query.search)
    res.status(200).json(response)
}

// get message by id 
const getMessageById = async(req, res) => {
    const response = await messageRepo.getMessageById(req.params.id)
    res.status(200).json(response)
}

// get root messages
const getRootMessages = async(req, res) => {
    const response = await messageRepo.getRootMessages()
    res.status(200).json(response)
}

// get child messages
const getChildMessages = async(req, res) => {
    if (!req.params.parent_id) throw new Error('Missing parent_id')
    const response = await messageRepo.getChildMessages(req.params.parent_id)
    res.status(200).json(response)
}

// create a new message object
const addMessage = async(req, res) => {
    if (!req.body.content) throw new Error('Message content missing!')
    // create root message object
    if (!req.body.parent_id) {
        const response = await messageRepo.addRootMessage(req.body.content, req.body.image_url)
        res.status(201).json(response)
        return
    }
    // create child message object
    const response = await messageRepo.addChildMessage(req.body.content, req.body.img_url, req.body.parent_id)
    res.status(201).json(response)
}

// update message 
const updateMessage = async(req, res) => {
    if (!req.params.id) throw new Error('Message id missing!')
    if (!req.body.content && !req.body.image_url ) throw new Error('Message information missing!')

    const response = await messageRepo.updateMessage(req.params.id, req.body.content, req.body.image_url)
    res.status(200).json(response)
}

// delete message 
const deleteMessage = async(req, res, next) => {
    try {
        if (!req.params.id) throw new Error('Message id missing!')

        // check if got child 
        const children = await messageRepo.getChildMessages(req.params.id)
        if (children.length != 0) throw new Error('Cannot delete a parent message')
    
        const response = await messageRepo.deleteMessage(req.params.id)
        res.status(200).json(response)    
    }
    catch(e){
        next(e)
    }
}


module.exports = {
    getMessages, addMessage, getMessageById, getChildMessages, getRootMessages, updateMessage, deleteMessage
}