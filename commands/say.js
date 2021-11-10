const config = require("../config.json");

module.exports = {
    name: 'say',
    description: "Say",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}say <any word>`);
        }else {
            message.channel.send(args);
        }
    }
}