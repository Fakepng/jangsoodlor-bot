const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'lottery',
    aliases: ["lotto"],
    description: "lottery",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}lotto <3 digit number can't be 000> 1000 ฿ per ticket.\nYou can buy only 1 ticket but another one for change number\nUsage ${config.PREFIX}lotto pool to see the price amount.\nUsage ${config.PREFIX}lotto previous to see previous winner.`)
        }else if(args == 'pool') {
            message.channel.send(`The price pool is now ${profileData.lottery_price_pool} ฿`);
        }else if(args == 'previous') {
            message.channel.send(`The previous winner number ${profileData.previous_lottery_winner}\nThe amount of winner is ${profileData.previous_lottery_count}\nThe winner got ${profileData.previous_lottery_price} ฿`);
        }else if(!args[0]) {
            return message.channel.send("Lotto number must be in range [0001 - 999]");
        }else {
            const lotto_number = args[0];
            if(lotto_number > 999 || lotto_number <= 0) return message.channel.send("Lotto number must be in range [0001 - 999]");
            try{
                if(profileData.coins < 1000) return message.channel.send("You don't have enough money.");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $set: {
                            lottery: lotto_number,
                        },
                        $inc: {
                            coins: -1000,
                        }
                    })
                await profileModel.updateMany({}, {
                    $inc: {
                        lottery_price_pool: 1000,
                    },
                });
                return message.channel.send(`You have successfully buy lotto`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}