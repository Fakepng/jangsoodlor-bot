const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'forza',
    description: "forza",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}forza`);
        }else {
            axios.get(`https://forza-api.tk/`).then(function (response) {
                message.channel.send(`${response.data.image}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}