const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'dog',
    description: "dog",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}dog`);
        }else {
            axios.get(`https://api.thedogapi.com/v1/images/search?api_key=${config.DOG_TOKEN}`).then(function (response) {
                message.channel.send(`${response.data[0].url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}