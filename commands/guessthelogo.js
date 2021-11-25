const config = require("../config.json");
const { GTL } = require('djs-games');

module.exports = {
    name: 'guessthelogo',
    aliases: ["gtl"],
    description: "guessthelogo",
    execute(message, args){
        const game = new GTL({
          message: message,
          token: config.DAGPI_TOKEN, // *Required!! Get Your Api Token at https://dagpi.xyz/dashboard
          stopCommand: 'stop', // *Required!!
          winFooter: 'You Win!', // Set The Footer of the win message
          winColor: 'GREEN', // The embed color of the win message
          loseFooter: 'You Lose!', // Set The Footer of the lose message
          loseColor: 'RED', // The embed color of the lose message
          questionFooter: 'Guess the Logo!', // Set The Footer of the question message
          questionColor: 'BLUE', // The embed color of the question message
          maxAttempts: 5, //
        })
        game.start()
    }
}