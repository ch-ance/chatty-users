const socketsRouter = require('express').Router()

const WebSocket = require('ws')

const Users = require('../data/helpers/users-model')

// const url = process.env.SOCKET_URL
// const connection = new WebSocket(url)

const port = process.env.PORT || 2020

const wss = new WebSocket.Server({ port: port })

wss.on('connection', ws => {
    ws.on('message', msg => {
        console.log('user db websocket server message: ', msg)
    })
    ws.send('hey from users')
})

module.exports = socketsRouter
