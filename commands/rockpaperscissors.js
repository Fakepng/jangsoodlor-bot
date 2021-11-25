const config = require("../config.json");
const { RockPaperScissors } = require('djs-games');

module.exports = {
    name: 'rockpaperscissors',
    aliases: ["rps"],
    description: "rockpaperscissors",
    execute(message, args){
        const game = new RockPaperScissors({
          message: message,
        })
        game.start()
    }
}