const config = require("../config.json");

module.exports = {
    name: 'meme',
    description: "We want meme!",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}meme`);
        }
            const axios = require('axios')
            axios.get('https://meme-api.herokuapp.com/gimme').then(function (response) {
                message.channel.send(`${response.data.title}\nLink: <${response.data.postLink}>`);
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })
    }
}