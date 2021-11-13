const axios = require('axios');
const config = require("../config.json");

module.exports = {
    name: 'quote',
    description: "Quote",
    execute(message, args){
        if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}quote <category>\ninspirational, programming, stoic`);
        }else {
            switch(args[0]){
                case 'programming':
                    axios.get(`https://programmingquotesapi.azurewebsites.net/quotes/random`).then(function (response) {
                        message.channel.send(`${response.data.en}`);
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case 'inspirational':
                    axios.get(`https://api.quotable.io/random`).then(function (response) {
                        message.channel.send(`${response.data.content}\n- ${response.data.author} -`);
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;
                case 'stoic':
                    axios.get(`https://api.themotivate365.com/stoic-quote`).then(function (response) {
                        message.channel.send(`${response.data.data.quote}\n- ${response.data.data.author} -`);
                    }).catch(function (error) {
                        console.log(error);
                    })
                    break;                    
                default:
                    message.channel.send(`Usage: ${config.PREFIX}quote <category>\ninspirational, programming, stoic`);
            }
        }
    }
}