const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'deposit',
    aliases: ["dep"],
    description: "deposit",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}dep <amount> or\n${config.PREFIX}dep wallet to deposit your wallet`);
        }else if(args == 'wallet'){
            var user = await profileModel.find( { "userID": message.author.id } );
            try{
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            bank: user[0].coins,
                        },
                        $set: {
                            coins: 0
                        }
                    }
                )
                return message.channel.send(`You has successfully deposited ${user[0].coins} ${config.CURRENCY}`)
            }catch(err){
                console.log(err);
            }
        }else{
            const amount = args[0];
            if(amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be whole number.");
            try{
                if(amount > profileData.coins) return message.channel.send("You don't have enough money.");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: -amount,
                            bank: amount,
                        }
                    })
                return message.channel.send(`You have successfully deposited ${amount} ${config.CURRENCY}`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}