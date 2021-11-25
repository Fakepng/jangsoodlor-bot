const { ConnectFour } = require('djs-games');

module.exports = {
    name: 'connect4',
    description: "connect4",
    execute(message, args){
        const game = new ConnectFour({
            message: message,
            player1: '🔴',
            player2: '🟡',
        })
        game.start()
    }
}