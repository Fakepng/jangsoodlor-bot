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
        }else {
            switch(args[0]) {
                case "any":
                    axios.get(`https://v2.jokeapi.dev/joke/Any`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "programming":
                    axios.get(`https://v2.jokeapi.dev/joke/Programming`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "miscellaneous":
                    axios.get(`https://v2.jokeapi.dev/joke/Miscellaneous`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "dark":
                    axios.get(`https://v2.jokeapi.dev/joke/Dark`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }                    
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "pun":
                    axios.get(`https://v2.jokeapi.dev/joke/Pun`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "spooky":
                    axios.get(`https://v2.jokeapi.dev/joke/Spooky`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case "christmas":
                    axios.get(`https://v2.jokeapi.dev/joke/Christmas`).then(function (response) {
                        if (response.data.type === "single") {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.joke}`);
                        } else {
                            message.channel.send(`Category: ${response.data.category}\n${response.data.setup} \n ${response.data.delivery}`);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                default:
                    message.channel.send("You need to specify a category!\nany, programming, miscellaneous, dark, pun, spooky, christmas");
            }
        }
    }
}