const express = require('express')
const config = require('./config')
const app = express()

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(config.APP.port, () => {
    console.log(`${config.APP.name} listening on port ${config.APP.port}`)
})