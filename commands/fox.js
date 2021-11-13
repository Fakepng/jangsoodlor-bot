const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'fox',
    description: "fox",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}fox or ${config.PREFIX}fox <ID>`);
        }else if(!args[0]){
            axios.get(`https://randomfox.ca/floof/`).then(function (response) {
                var foxIdjpg = response.data.image.replace( /^\D+/g, ''); // replace all leading non-digits with nothing
                var foxId = foxIdjpg.slice(0, -4)
                message.channel.send(`${response.data.image}`);
                message.channel.send(`ID: ${foxId}`);
            }).catch(function (error) {
                console.log(error);
            })
        }else {
            message.channel.send(`https://randomfox.ca/images/${args}.jpg`);
        }
    }
}