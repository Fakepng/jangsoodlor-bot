const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'cat',
    description: "cat",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}cat or ${config.PREFIX}cat fact`);
        }else if(!args[0]){
            axios.get(`https://api.thecatapi.com/v1/images/search?api_key=${config.CAT_TOKEN}`).then(function (response) {
                message.channel.send(`${response.data[0].url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }else if(args == 'fact'){
            axios.get(`https://catfact.ninja/fact`).then(function (response) {
                message.channel.send(`${response.data.fact}`);
            }).catch(function (error) {
                console.log(error);
            })
        }else {
            message.channel.send(`Usage: ${config.PREFIX}cat or ${config.PREFIX}cat fact`);
        }
    }
}