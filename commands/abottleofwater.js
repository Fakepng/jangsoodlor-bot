const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'abottleofwater',
    aliases: ["abow"],
    description: "a bo'ohw'o'wo'er",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}abow`);
        }else {
            message.channel.send(`a bo'ohw'o'wo'er\nhttps://youtu.be/E9Jxt5K1NFY`);
        }
    }
}