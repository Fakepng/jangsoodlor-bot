const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'dailyreward',
    aliases: ["dr"],
    description: "dailyreward",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}dr to receive money in bank account one per day (reset at 6:00)`)
        }else {
            try{
                if(profileData.reward == 1) return message.channel.send("You already received your reward");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            bank: 100,
                        },
                        $set: {
                            reward: 1,
                        }
                    })
                console.log(`${message.author.username}, ${message.author.id} has received their daily reward`);
                return message.channel.send(`You have successfully received your reward 100 ${config.CURRENCY}`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}