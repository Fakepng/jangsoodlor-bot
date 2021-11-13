const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'duck',
    description: "duck",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}duck`);
        }else {
            axios.get(`https://random-d.uk/api/v2/random`).then(function (response) {
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}