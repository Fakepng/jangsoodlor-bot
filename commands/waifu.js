const config = require("../config.json");
const axios = require('axios');

module.exports = {
    name: 'waifu',
    description: "waifu",
    execute(message, args){
        if (!args[0]) {
            axios.get(`https://api.waifu.pics/sfw/waifu`).then(function (response) {
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })            
        }else if(args == 'help'){
            message.channel.send(`Usage: ${config.PREFIX}waifu <Category>\nNoting or (neko, shinobu, megumin, bully, cuddle, cry, hug, awoo, kiss, lick, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe)`);
        }else if(args[0] == 'nsfw'){
            if(!args[1]){
                message.channel.send(`${config.PREFIX}waifu nsfw <waifu, neko, trap, blowjob>`)
            }else {
                axios.get(`https://api.waifu.pics/nsfw/${args[1]}`).then(function (response) {
                    message.channel.send(`${response.data.url}`);
                }).catch(function (error) {
                    console.log(error);
                })                
            }
        }else {
            axios.get(`https://api.waifu.pics/sfw/${args[0]}`).then(function (response) {
                message.channel.send(`${response.data.url}`);
            }).catch(function (error) {
                console.log(error);
            })
        }
    }
}