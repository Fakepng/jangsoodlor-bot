const config = require("../config.json");

module.exports = {
    name: 'balance',
    aliases: ["bal"],
    description: "balance",
    execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}bal`)
        }else {
            message.channel.send(`Your wallet balance is ${profileData.coins} ฿\nYour bank balance is ${profileData.bank} ฿`);
        }
    }   
}