const config = require("../config.json");

module.exports = {
    name: 'http',
    description: "Http Code",
    execute(message, args){
        if (args == 'list'){
            message.channel.send(`<https://http.cat/?ref=apilist.fun>`);
        }else if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}http list for list the http code of ${config.PREFIX}http <code>`);
        }else {
            message.channel.send(`https://http.cat/${args}`);
        }
    }
}