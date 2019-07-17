require('dotenv').config()
const WebSocket = require('ws').Server

const { server, wsServer } = require('./api/server.js')
const port = process.env.PORT || 5432

const wsPORT = 2020

server.listen(port, function() {
    console.log(`*** Server listening on port ${port}. ***`)
})

wsServer.listen(wsPORT, () => {
    console.log('web socket db is listenin')
})
