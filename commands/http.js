const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'http',
    description: "Http Code",
    execute(message, args){
        if (args == 'list'){
            message.channel.send(`https://http.cat/?ref=apilist.fun`);
        }else {
            message.channel.send(`https://http.cat/${args}`);
        }
    }
}