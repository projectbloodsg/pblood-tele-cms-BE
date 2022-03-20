const messageRepo = {}

messageRepo.init = (db) => {
    messageRepo.db = db
}

/**
 * Get message by id
 * @param {UUID} id 
 */
 messageRepo.getMessageById = async (id) => {
    const res = await messageRepo.db.query('SELECT * FROM "message" where message_id = $1', [id])
    return res.rows[0]
}

/**
 * Get messages by search term, limit and offset
 * @param {*} limit 
 * @param {*} offset
 * @param {*} search 
 */
 messageRepo.getMessages = async (limit = 20, offset = 0, search = '') => {
    const searchTerm = '%' + search + '%'
    const res = await messageRepo.db.query(`SELECT * FROM message WHERE "content" LIKE $1 LIMIT $2 OFFSET $3`, [searchTerm, limit, offset])
    return res.rows
}

/**
 * Get all root messages
 */
 messageRepo.getRootMessages = async () => {
    const res = await messageRepo.db.query('SELECT * FROM "message" where parent_id IS NULL')
    return res.rows
}

/**
 * Get all child messages from a parent
 * @param {*} parentId 
 */
 messageRepo.getChildMessages = async (parentId) => {
    console.log(parentId);
    const res = await messageRepo.db.query(`SELECT * FROM "message" where parent_id = $1`,[parentId])
    return res.rows
}

/**
 * Create new root message 
 * @param {*} content 
 * @param {*} imgURL
 */
 messageRepo.addRootMessage = async (content, imgURL = '') => {
    const res = await messageRepo.db.query(`INSERT INTO message ("content", "image_url") VALUES ($1, $2)`, [content, imgURL])
    return res.rows
}

/**
 * Create new root message 
 * @param {*} content 
 * @param {*} imgURL
 * @param {*} parent_id
 */
 messageRepo.addChildMessage = async (content, imgURL = '', parent_id) => {
    const res = await messageRepo.db.query(`INSERT INTO message ("content", "image_url", "parent_id") VALUES ($1, $2, $3)`, [content, imgURL, parent_id])
    return res.rows
}

module.exports = messageRepo