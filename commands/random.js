const config = require("../config.json");
const profileModel = require('../models/profileSchema');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

module.exports = {
    name: 'random',
    aliases: ["ran"],
    description: "random",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}random <lower bound> <upper bound>`);
        }else {
            var lowerBound = parseInt(args[0]);
            var upperBound = parseInt(args[1]);
            var randomNumber = getRndInteger(lowerBound, upperBound);
            message.channel.send(`Your random number is ${randomNumber}`);
        }
    }   
}