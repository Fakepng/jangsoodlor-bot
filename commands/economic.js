const config = require("../config.json");
const profileModel = require('../models/profileSchema');

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

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
                            case "pick":
                                if(!args[3]){
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
                                                    lottery: 0,
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
                                                    previous_lottery_price: winner[0].lottery_price_pool / count,
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
                                                lottery: 0,
                                            },
                                        });
                                        return message.channel.send(`You have successfully pick lotto ticket`);
                                    }catch(err){
                                        console.log(err);
                                    }
                                }else{
                                    var lotto_number = args[3];
                                    var winner = await profileModel.find( { "lottery": lotto_number } );
                                    var count = 0;
                                        for (var k in winner) {
                                            if (winner.hasOwnProperty(k)) count++;
                                        }
                                    if (count == 0) {
                                        try{
                                            await profileModel.updateMany({}, {
                                                $set: {
                                                    lottery: 0,
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
                                                    previous_lottery_price: winner[0].lottery_price_pool / count,
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
                                                lottery: 0,
                                            },
                                        });
                                        return message.channel.send(`You have successfully pick lotto ticket`);
                                    }catch(err){
                                        console.log(err);
                                    }
                                }
                                
                            break;
                            case "ticket":
                                if(args[3] == 'everyone'){
                                    try{
                                        await profileModel.updateMany({}, {
                                            $set: {
                                                lottery: args[4],
                                            },
                                        });
                                        return message.channel.send(`You have successfully set everyone lotto ticket to ${args[4]}`);
                                    }catch(err){
                                        console.log(err);
                                    }
                                }else {
                                    try{
                                        await profileModel.findOneAndUpdate(
                                            {
                                                userID: message.mentions.users.first().id
                                            },{
                                                $set: {
                                                    lottery: args[4],
                                                }
                                            })
                                        return message.channel.send(`You have successfully set lotto ticket of ${args[3]} to ${args[4]}`);
                                    }catch(err){
                                        console.log(err);
                                    }
                                }
                            break;
                        }
                    break;
                    case "interest":
                        var account = await profileModel.find();
                        var count = 0;
                        for (var k in account) {
                            if (account.hasOwnProperty(k)) count++;
                        }
                        for (i = 0; i < count; i++) {
                            try{
                                await profileModel.findOneAndUpdate(
                                    {
                                        userID: account[i].userID,
                                    },{
                                        $inc: {
                                            bank: Math.round((account[i].bank * 0.01) * 100) / 100,
                                        }
                                    })
                            }catch(err){
                                console.log(err);
                            }
                        }
                        message.channel.send(`You have successfully update interest`);
                    break;
                    case "round":
                        switch(args[2]){
                            case "coins":
                                var account = await profileModel.find();
                                var count = 0;
                                for (var k in account) {
                                    if (account.hasOwnProperty(k)) count++;
                                }
                                for (i = 0; i < count; i++) {
                                    try{
                                        await profileModel.findOneAndUpdate(
                                        {
                                            userID: account[i].userID,
                                        },{
                                            $set: {
                                                coins: Math.round(account[i].coins * 100) / 100,
                                            }
                                        })
                                    }catch(err){
                                    console.log(err);
                                    }
                                }
                                message.channel.send(`You have successfully round everyone wallet`);
                            break;
                            case "bank":
                                var account = await profileModel.find();
                                var count = 0;
                                for (var k in account) {
                                    if (account.hasOwnProperty(k)) count++;
                                }
                                for (i = 0; i < count; i++) {
                                    try{
                                        await profileModel.findOneAndUpdate(
                                        {
                                            userID: account[i].userID,
                                        },{
                                            $set: {
                                                bank: Math.round(account[i].bank * 100) / 100,
                                            }
                                        })
                                    }catch(err){
                                    console.log(err);
                                    }
                                }
                                message.channel.send(`You have successfully round everyone bank`);
                            break;
                        }
                    break;
                    case "dr":
                        if(args[2] == 'reset'){
                            try{
                                await profileModel.updateMany({}, {
                                    $set: {
                                        reward: 0,
                                    },
                                });
                                return message.channel.send(`You have successfully reset daily reward`);
                            }catch(err){
                                console.log(err);
                            }
                        }else if(args[2] == 'off'){
                            try{
                                await profileModel.updateMany({}, {
                                    $set: {
                                        reward: 1,
                                    },
                                });
                                return message.channel.send(`You have successfully turn off daily reward for a day`);
                            }catch(err){
                                console.log(err);
                            }
                        }
                    break;
                }
            break;
            case "see":
                if(message.mentions.members.size > 0){
                    var seeUser = await profileModel.find( { "userID": message.mentions.users.first().id } );
                    if(seeUser.length == 0) return message.channel.send(`${args[1]} is not yet registered`);
                    message.channel.send(`${args[1]}'s data:\nWallet: ${seeUser[0].coins} ${config.CURRENCY}\nBank: ${seeUser[0].bank} ${config.CURRENCY}\nLotto: ${seeUser[0].lottery}`);
                }else {
                    var seeUser = await profileModel.find( { "userID": args[1] } );
                    if(seeUser.length == 0) return message.channel.send(`${args[1]} is not yet registered`);
                    message.channel.send(`${args[1]}'s data:\nWallet: ${seeUser[0].coins} ${config.CURRENCY}\nBank: ${seeUser[0].bank} ${config.CURRENCY}\nLotto: ${seeUser[0].lottery}`);
                }
            break;
        }
    }   
}