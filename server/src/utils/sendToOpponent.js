const disconnect = (socket, _games) => {
  const token = findToken(socket, _games)

  if (!token) return _games

  maybeEmit('opponent-disconnected', socket, _games, { token })
  clearInterval(_games.getIn([token, 'interval']))
  _games = _games.delete(token)

  return _games
}

const maybeEmit = (event, socket, _games, emissionData) => {
  const token  = emissionData.token
  const move = emissionData.move || {}

  if (!_games.has(token)) return

  const opponent = getOpponent(_games, token, socket)
  if (opponent) {
    opponent.get('socket').emit(event, move)
  }
}

const findToken = (socket, _games) => {
  return _games.findKey((game, token) =>
    game.get('players').some((player) => player.get('socket') === socket)
  )
}

const getOpponent = (_games, token, socket) => {
  let index = null

  _games.getIn([token, 'players']).forEach((player, idx) => {
    if (player.get('socket') === socket) {
      index = Math.abs(idx - 1)

      return false
    }
  })

  if (index !== null) {
    return _games.getIn([token, 'players', index])
  }
}

module.exports = { disconnect, maybeEmit }
