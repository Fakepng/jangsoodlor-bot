const axios = require('axios');
const config = require("../config.json");
var quotesId = 0;
var argsId = 0;

module.exports = {
    name: 'salim',
    description: "Salim's quotes",
    execute(message, args){
        if (args[0] == "latest"){
            axios.get('https://watasalim.vercel.app/api/quotes/latest').then(function (response) {
                message.channel.send(`สลิ่ม: ${response.data.quote.body}\nLink: <${response.data.quote.url}> ID: ${response.data.quote.id}`);
            }).catch(function (error) {
                console.log(error);
            }) 
        }else if (args == 'help'){
            message.channel.send(`Usage ${config.PREFIX}salim for random or ${config.PREFIX}salim latest for latest quote from salim or ${config.PREFIX}salim <id>`);
        }else {
            var argsId = parseInt(args[0], 10);
            axios.get('https://watasalim.vercel.app/api/quotes/latest').then(function (response) {
                var quotesId = parseInt(response.data.quote.id, 10);
                if (argsId <= quotesId && argsId > 0) {
                    axios.get(`https://watasalim.vercel.app/api/quotes/${args}`).then(function (response) {
                        message.channel.send(`สลิ่ม: ${response.data.quote.body}\nLink: <${response.data.quote.url}> ID: ${response.data.quote.id}`);
                    }).catch(function (error) {
                        console.log(error);
                    }) 
                }else if (!args[0]) {
                    axios.get('https://watasalim.vercel.app/api/quotes/random').then(function (response) {
                        message.channel.send(`สลิ่ม: ${response.data.quote.body}\nLink: <${response.data.quote.url}> ID: ${response.data.quote.id}`);
                    }).catch(function (error) {
                        console.log(error);
                    })               
                }else {
                    message.channel.send(`สลิ่มมากเกินไปนะครับ\nต้องอยู่ระหว่าง 1 ถึง ${quotesId}`);
                }
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}