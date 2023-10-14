'use strict'

const server = require('http').createServer()
const Server = require('socket.io').Server
const dotenv = require('dotenv')

dotenv.config()

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_HOST,
    methods: ['GET', 'POST']
  }
})
io.listen(5000)

io.sockets.on('connection', (socket) => {
  socket.emit('hello', { token: socket.id })
})
