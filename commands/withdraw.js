const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'withdraw',
    aliases: ["wd"],
    description: "withdraw",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}wd <amount>`)
        }else {
            const amount = args[0];
            if(amount % 1 != 0 || amount <= 0) return message.channel.send("Withdraw amount must be whole number.");
            try{
                if(amount > profileData.bank) return message.channel.send("You don't have enough money.");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: amount,
                            bank: -amount,
                        }
                    })
                return message.channel.send(`You have successfully withdraw ${amount} ฿`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}