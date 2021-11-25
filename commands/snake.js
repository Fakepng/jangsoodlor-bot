const { Snake } = require('djs-games');

module.exports = {
    name: 'snake',
    description: "snake",
    execute(message, args){
      const game = new SnakeGame({
        message: message,
        buttons: false, // If you want to use buttons || False if you want to use reactions
        snake: '🟩',
        apple: '🍎',
        embedColor: 'RANDOM',
        leftButton: '⬅',
        rightButton: '➡',
        upButton: '⬆',
        downButton: '⬇',
      })
      game.start()
    }
}