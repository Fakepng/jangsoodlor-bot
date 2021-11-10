const config = require("../config.json");

module.exports = {
    name: 'hello',
    description: "Hello Comrade",
    execute(message, args){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}hello`);
        }else {
            message.channel.send('Hello Comrade!');
        }
    }
}