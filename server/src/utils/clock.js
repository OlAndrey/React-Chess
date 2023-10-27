const runClock = (io, socket, _games, updateGame, dataClock) => {
  const { color, token } = dataClock
  if (!_games.has(token)) return _games

  _games.getIn([token, 'players']).forEach((player, idx) => {
    if (player.get('socket') === socket && player.get('color') === color) {
      console.log('clock-run')
      clearInterval(_games.getIn([token, 'interval']))

      _games = _games.setIn(
        [token, 'interval'],
        setInterval(() => {
          const timeLeft = updateGame(token, idx)

          if (timeLeft >= 0) {
            io.to(token).emit('countdown', {
              time: timeLeft,
              color: color
            })
          } else {
            io.to(token).emit('countdown-gameover', {
              color: color
            })
            clearInterval(_games.getIn([token, 'interval']))
          }
        }, 1000)
      )

      return false
    }
  })

  return _games
}

module.exports = { runClock }
