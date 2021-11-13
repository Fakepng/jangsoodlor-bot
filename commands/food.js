const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'food',
    description: "food",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}food`);
        }else {
            axios.get(`https://foodish-api.herokuapp.com/api/`).then(function (response) {
                message.channel.send(`${response.data.image}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}