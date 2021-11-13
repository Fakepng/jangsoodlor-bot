const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'bored',
    description: "bored",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}bored`);
        }else {
            axios.get(`https://www.boredapi.com/api/activity/`).then(function (response) {
                message.channel.send(`${response.data.activity}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}