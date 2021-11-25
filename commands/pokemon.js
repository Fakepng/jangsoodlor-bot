const config = require("../config.json");
const { Pokemon } = require('djs-games');

module.exports = {
    name: 'pokemon',
    description: "pokemon",
    execute(message, args){
        const game = new Pokemon({
          message: message,
          token: config.DAGPI_TOKEN,
          winMessage: 'You Win!',
          loseMessage: 'You Lose!',
          wrongGuess: 'Wrong Guess!',
          stopCommand: 'stop',
          maxAttempts: 10,
        })
        game.start()
    }
}