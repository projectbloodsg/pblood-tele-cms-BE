const express = require('express')
const pg = require('pg')
const bodyParser = require("body-parser");


const config = require('./config')
const messageRouter = require('./routes/messageRouter')
const messageRepo = require('./datalayers/messageRepo')

// initialise app
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// initialise database
const database = new pg.Pool({
    host: config.DATABASE.host,
    database: config.DATABASE.database,
    password: config.DATABASE.password,
    port: config.DATABASE.port,
})

// initialise datalayers
messageRepo.init(database)

// set routes
app.get('/', (req,res) => {res.send('Hello World!')})
app.use('/message', messageRouter)


app.listen(config.APP.port, () => {
    console.log(`${config.APP.name} listening on port ${config.APP.port}`)
})