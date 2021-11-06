module.exports = {
    name: 'salim',
    description: "Salim's quotes",
    execute(message, args){
            const axios = require('axios')
            axios.get('https://watasalim.vercel.app/api/quotes/random').then(function (response) {
                message.channel.send(`สลิ่ม: ${response.data.quote.body}`);
            }).catch(function (error) {
                console.log(error);
            })
    }
}