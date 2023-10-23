const maybeEmit = (event, _games, emissionData) => {
  const { data, token, socket } = emissionData
  if (!_games.has(token)) return

  const opponent = getOpponent(_games, token, socket)
  if (opponent) {
    opponent.get('socket').emit(event, data)
  }
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

module.exports = { getOpponent, maybeEmit }
