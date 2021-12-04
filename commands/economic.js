const config = require("../config.json");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'ecnomic',
    aliases: ["eco"],
    description: "economic set",
    async execute(message, args, profileData){
        if(message.author.id != config.OWNER_ID) return message.channel.send("You are not the bot's owner.");
        switch(args[0]){
            case "set":
                switch(args[1]){
                    case "wallet":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $set: {
                                        coins: args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully set ${args[2]} wallet to ${args[3]} ${config.CURRENCY}`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                    case "bank":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $set: {
                                        bank: args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully set ${args[2]} bank to ${args[3]} ${config.CURRENCY}`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                }
            break;
            case "give":
                switch(args[1]){
                    case "wallet":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $inc: {
                                        coins: args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully gave ${args[2]} ${args[3]} ${config.CURRENCY} in wallet`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                    case "bank":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $inc: {
                                        bank: args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully gave ${args[2]} ${args[3]} ${config.CURRENCY} in bank`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                }
            break;
            case "take":
                switch(args[1]){
                    case "wallet":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $inc: {
                                        coins: -args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully took from ${args[2]}'s wallet ${args[3]} ${config.CURRENCY}`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                    case "bank":
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: message.mentions.users.first().id
                                },{
                                    $inc: {
                                        bank: -args[3],
                                    }
                                })
                            return message.channel.send(`You have successfully took from ${args[2]}'s bank ${args[3]} ${config.CURRENCY}`);
                        }catch(err){
                            console.log(err);
                        }
                    break;
                }
            break;
            case "update":
                switch(args[1]){
                    case "lotto":
                        switch(args[2]){
                            case "pool":
                                try{
                                    await profileModel.updateMany({}, {
                                        $set: {
                                            lottery_price_pool: args[3],
                                        }
                                    });
                                    return message.channel.send(`You have successfully update lotto price pool to ${args[3]} ${config.CURRENCY}`);
                                }catch(err){
                                    console.log(err);
                                }
                            break;
                        }
                    break;
                }
            break;
        }
    }   
}