const express = require('express')
const helmet = require('helmet')
const http = require('http')
const cors = require('cors')
const morgan = require('morgan')
const usersRouter = require('../routers/userRouter.js')
const authRouter = require('../routers/auth-router')
const server = express()

const wsApp = express()

wsApp.use(express.static(__dirname + '/'))

const wsServer = http.createServer(wsApp)

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(morgan('combined'))

server.get('/', (req, res) => {
    res.status(200).send('Server is up and running')
})

server.use('/api/users', usersRouter)
server.use('/api/auth', authRouter)

module.exports = {
    server,
    wsServer,
}
