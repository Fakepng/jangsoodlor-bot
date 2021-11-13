const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'waifu',
    description: "waifu",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}waifu`);
        }else if(!args[0]){
            axios.get(`https://api.waifu.pics/sfw/waifu`).then(function (response) {
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }else if(args[0] == 'nsfw'){
            axios.get(`https://api.waifu.pics/nsfw/waifu`).then(function (response) {
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }else {
            message.channel.send(`Usage: ${config.PREFIX}waifu ${config.PREFIX}fox nsfw`);
        }
    }
}