const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'dict',
    description: "Dictionary",
    execute(message, args){
        if(args == 'help' || !args[0]){
            message.channel.send(`Usage: ${config.PREFIX}dict <word to search>`);
        }else {
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args}`).then(function (response) {
                message.channel.send(`Word: ${response.data[0].word}\nPhonetic: /${response.data[0].phonetics[0].text}/\nAudio: https:${response.data[0].phonetics[0].audio}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}