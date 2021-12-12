const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'pay',
    description: "pay",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}pay <who> <amount>`)
        }else {
            const amount = args[1];
            if(amount % 1 != 0 || amount <= 0) return message.channel.send("Withdraw amount must be whole number.");
            try{
                if(amount > profileData.coins) return message.channel.send("You don't have enough money.");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: -amount,
                        }
                    })
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.mentions.users.first().id
                    },{
                        $inc: {
                            coins: amount,
                        }
                    })
                console.log(`${message.author.username}, ${message.author.id} has paid ${message.mentions.users.first().username}, ${message.mentions.users.first().id} ${amount} ${config.CURRENCY}`)
                return message.channel.send(`You have successfully pay ${args[0]} ${amount} ${config.CURRENCY}`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}