const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'pic',
    description: "Quote",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}pic <width> <height>`);
        }else {
            message.channel.send(`https://picsum.photos/${args[0]}/${args[1]}`);
        }
    }
}