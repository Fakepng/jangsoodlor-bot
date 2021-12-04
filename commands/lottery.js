const config = require("../config.json");
const profileModel = require('../models/profileSchema');
const cron = require('cron');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

module.exports = {
    name: 'lottery',
    aliases: ["lotto"],
    description: "lottery",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}lotto <2 digit number can't be 00> 1000 ${config.CURRENCY} per ticket.\nYou can buy only 1 ticket but another one for change number\nUsage ${config.PREFIX}lotto pool to see the price amount.\nUsage ${config.PREFIX}lotto previous to see previous winner.`)
        }else if(args == 'pool') {
            message.channel.send(`The price pool is now ${profileData.lottery_price_pool} ${config.CURRENCY}`);
        }else if(args == 'previous') {
            message.channel.send(`The previous winner number ${profileData.previous_lottery_winner}\nThe amount of winner is ${profileData.previous_lottery_count}\nThe winner got ${profileData.previous_lottery_price} ${config.CURRENCY}`);
        }else if(!args[0]) {
            return message.channel.send("Lotto number must be in range [01 - 99]");
        }else if(args == 'start') {
            if(message.author.id != config.OWNER_ID) return message.channel.send("You are not the bot's owner.");
            let scheduledLotto = new cron.CronJob('1 0 * * SAT', async () => {
                var lotto_number = getRndInteger(1, 99);
                var winner = await profileModel.find( { "lottery": lotto_number } );
                var count = 0;
                    for (var k in winner) {
                        if (winner.hasOwnProperty(k)) count++;
                    }
                if (count == 0) {
                    try{
                        await profileModel.updateMany({}, {
                            $set: {
                                lottery_number: 0,
                                previous_lottery_price: 0,
                            },
                            $mul: {
                                lottery_price_pool: 0.5,
                            }
                        });
                    }catch(err){
                        console.log(err);
                    }
                }else {
                    for (let i = 0; i < count; i++) {
                        console.log(winner[i].userID);
                        try{
                            await profileModel.findOneAndUpdate(
                                {
                                    userID: winner[i].userID,
                                },{
                                    $inc: {
                                        bank: winner[i].lottery_price_pool / count,
                                    }
                                })
                        }catch(err){
                            console.log(err);
                        }
                    }
                    try{
                        await profileModel.updateMany({}, {
                            $set: {
                                lottery_price_pool: 0,
                                previous_lottery_price: winner[i].lottery_price_pool / count,
                            },
                        });
                    }catch(err){
                        console.log(err);
                    }
                }
                try{
                    await profileModel.updateMany({}, {
                        $set: {
                            previous_lottery_winner: lotto_number,
                            previous_lottery_count: count,
                        },
                    });
                }catch(err){
                    console.log(err);
                }
            });
            scheduledLotto.start()
            console.log("Lotto started");
            message.channel.send("Lotto started");
        }else {
            const lotto_number = args[0];
            if(lotto_number > 99 || lotto_number <= 0) return message.channel.send("Lotto number must be in range [01 - 99]");
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