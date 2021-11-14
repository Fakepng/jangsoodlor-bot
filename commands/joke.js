const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'joke',
    description: "Joke!",
    execute(message, args){
        if (!args[0]) {
            message.channel.send("You need to specify a category!\nany, programming, miscellaneous, dark, pun, spooky, christmas");
        }else if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}joke <any, programming, miscellaneous, dark, pun, spooky, christmas>`);
        }else if(args == 'any' || args == 'programming' || args == 'miscellaneous' || args == 'dark' || args == 'pun' || args == 'spooky' || args == 'christmas') {
            axios.get(`https://v2.jokeapi.dev/joke/${args[0]}`).then(function (response) {
                if (response.data.type === "single") {
                    message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                } else {
                    message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}