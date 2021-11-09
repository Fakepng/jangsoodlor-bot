module.exports = {
    name: 'dict',
    description: "Dictionary",
    execute(message, args){
            const axios = require('axios')
            axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${args}`).then(function (response) {
                message.channel.send(`Word: ${response.data[0].word}\nPhonetic: /${response.data[0].phonetics[0].text}/\nAudio: https:${response.data[0].phonetics[0].audio}`);
            }).catch(function (error) {
                console.log(error);
            })
    }
}