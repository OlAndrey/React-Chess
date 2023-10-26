const runClock = (io, socket, _games, dataClock) => {
  const { color, token } = dataClock
  if (!_games.has(token)) return

  _games.getIn([token, 'players']).forEach((player, idx) => {
    if (player.get('socket') === socket && player.get('color') === color) {
      clearInterval(_games.getIn([token, 'interval']))

      _games = _games.setIn(
        [token, 'interval'],
        setInterval(() => {
          let timeLeft = 0
          _games = _games.updateIn([token, 'players', idx, 'time'], (time) => {
            timeLeft = time - 1
            return time - 1
          })

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
}

module.exports = { runClock }
