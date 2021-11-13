const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'axolotl',
    description: "axolotl",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}axolotl`);
        }else {
            axios.get(`https://axoltlapi.herokuapp.com/`).then(function (response) {
                message.channel.send(`${response.data.url}`);
                message.channel.send(`${response.data.facts}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}