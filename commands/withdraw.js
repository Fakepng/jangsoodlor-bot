const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'withdraw',
    aliases: ["wd"],
    description: "withdraw",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}wd <amount> or\n${config.PREFIX}wd bank to withdraw all from bank`);
        }else if(args == 'bank'){
            var user = await profileModel.find( { "userID": message.author.id } );
            try{
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: user[0].bank,
                        },
                        $set: {
                            bank: 0
                        }
                    }
                )
                console.log(`${message.author.username}, ${message.author.id} withdrew ${user[0].bank} from bank`);
                return message.channel.send(`You have successfully withdraw ${user[0].bank} ${config.CURRENCY}`)
            }catch(err){
                console.log(err);
            }
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
                console.log(`${message.author.username}, ${message.author.id} withdrew ${amount} from bank`);
                return message.channel.send(`You have successfully withdraw ${amount} ${config.CURRENCY}`);
            }catch(err){
               console.log(err);
            }
        }
    }   
}