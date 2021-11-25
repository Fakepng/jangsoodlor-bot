const TicTacToe = require('discord-tictactoe');
const game = new TicTacToe({ language: 'en' })
const config = require("../config.json");

module.exports = {
    name: 'tictactoe',
    aliases: ["ttt"],
    description: "tictactoe",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}ttt or ${config.PREFIX}ttt @someone`)
        }else {
            game.handleMessage(message);
        }
    }
}