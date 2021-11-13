const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'number',
    description: "number",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}number <number>`);
        }else {
            axios.get(`http://numbersapi.com/${args[0]}?json`).then(function (response) {
                message.channel.send(`${response.data.text}`);
            }).catch(function (error) {
                console.log(error);
            })            
        }
    }
}