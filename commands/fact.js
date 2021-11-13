const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'fact',
    description: "fact",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}fact <category>`);
        } else {
            switch(args[0]){
                case 'useless':
                    axios.get(`https://uselessfacts.jsph.pl/random.json?language=en`).then(function (response) {
                        message.channel.send(`${response.data.text}`);
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case 'fun':
                    axios.get(`https://asli-fun-fact-api.herokuapp.com/`).then(function (response) {
                        message.channel.send(`${response.data.data.fact}`);
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                default:
                    message.channel.send(`You need to specify a category!\nfun, useless`);
            }
        }
    }
}