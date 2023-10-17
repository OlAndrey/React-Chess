'use strict'

const server = require('http').createServer()
const Server = require('socket.io').Server
const dotenv = require('dotenv')
const Immutable = require('immutable')
const Map = Immutable.Map
const List = Immutable.List

dotenv.config()

const _games = Map()

const io = new Server(server, {
  cors: {
    origin: process.env.FRONT_END_HOST,
    methods: ['GET', 'POST']
  }
})
io.listen(5000)

io.sockets.on('connection', (socket) => {
  socket.emit('hello', { token: socket.id })

  socket.on('create-game', (data) => {
    const id = Buffer.from(Math.random() + socket.id)
    const token = id.toString('base64').slice(12, 28)

    // token is valid for 3 minutes
    const timeout = setTimeout(() => {
      if (_games.getIn([token, 'players']).isEmpty()) {
        _games = _games.delete(token)
      }
    }, 3 * 60 * 1000)

    _games = _games.set(
      token,
      Map({
        creator: socket,
        players: List(),
        interval: null,
        gameTime: data.time * 60,
        timeout: timeout
      })
    )

    socket.emit('created', { token: token })
  })

  socket.on('check-token', (data) => {
    const game = _games.get(data.token)

    if (!game) socket.emit('token-invalid')
    else socket.emit('token-ok')
  })
})
