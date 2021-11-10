const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'gif',
    description: "Gif!",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}gif <search term>`);
        }else {
            axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${config.GIPHY_TOKEN}&q=${args}&limit=1&offset=0&rating=g&lang=en`).then(function (response) {
                const { data: [{url}]} = response.data;
                message.channel.send(`${url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}