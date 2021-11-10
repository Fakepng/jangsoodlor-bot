const config = require("../config.json");

module.exports = {
    name: 'member',
    description: "Display server member count",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`${config.prefix}member`);
        }else {
            message.channel.send(`Total Member: ${message.guild.memberCount}`);
        }
    }
}