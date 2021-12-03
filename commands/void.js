const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'void',
    description: "void",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}void <amount> this will void your money X amount`); 
        }else {
            const amount = args[0];
            if(amount % 1 != 0 || amount <= 0) return message.channel.send(`Void amount must be whole number and more than 0 ${config.CURRENCY}.`);
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
                return message.channel.send(`You have successfully void ${amount} ${config.CURRENCY}`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}