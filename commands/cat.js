const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'cat',
    description: "cat",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}cat`);
        }else {
            axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${config.CAT_TOKEN}`).then(function (response) {
                message.channel.send(`${response.data[0].url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}