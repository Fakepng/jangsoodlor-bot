const config = require("../config.json");
const profileModel = require('../models/profileSchema');
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'slots',
    aliases: ["slot"],
    description: "slots",
    async execute(message, args, profileData){
        if(args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}slots (100 ${config.CURRENCY} per round win upto 500 ${config.CURRENCY})`)
        }else {
            try{
                if (profileData.coins < 100) return message.channel.send("You don't have enough money.");
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: -100,
                        }
                    })
            }catch(err){
               console.log(err);
            }
            const slotemoji = ":money_mouth:";
            const customemoji = "<a:"+ config.emojiname +":"+ config.emojiid + ">";
            if(config.haveEmoji === '1') slotemoji = customemoji;
            
            /* ITEMS (SLOTS) */
            
            let items = ['💵','💍','💯']; 
            
            /* RANDOM */
            let $ = items[Math.floor(items.length * Math.random())];
            let $$ = items[Math.floor(items.length * Math.random())];
            let $$$ = items[Math.floor(items.length * Math.random())];
            
            /* EMBEDS */
            
            const play = new MessageEmbed()
                .setTitle("Slot Machine")
                .setDescription("• "+slotemoji+"  "+slotemoji+"  "+slotemoji+" •")
                .setColor('RANDOM')
                .setFooter("are you lucky?")
            
            const $1 = new MessageEmbed()
                .setTitle("Slot Machine")
                .setDescription("• "+$+"  "+slotemoji+"  "+slotemoji+" •")
                .setColor('RANDOM')
                .setFooter("are you lucky?")
             
            const $2 = new MessageEmbed()
                .setTitle("Slot Machine")
                .setDescription("• "+$+"  "+$$+"  "+slotemoji+" •")
                .setColor('RANDOM')
                .setFooter("are you lucky?")
             
             
            const $3 = new MessageEmbed()
                .setTitle("Slot Machine")
                .setDescription("• "+$+"  "+$$+"  "+$$$+" •")
                .setColor('RANDOM')
                .setFooter("are you lucky?")
            
             /* SPIN THE SLOTS */
             
             spinner = await message.channel.send(play)
               setTimeout(() => {
               spinner.edit($1);
              }, 600);
              setTimeout(() => {
               spinner.edit($2);
              }, 1200);
              setTimeout(() => {
               spinner.edit($3);
              }, 1800);
              
            /* DEDUCT RESULTS */
            // You can add/remove user balance in respective result (if using some currency system)
            
            if($$ !== $ && $$ !== $$$) {
            setTimeout(() => {
               message.channel.send("You LOST!")
            }, 2000);
            
            } else if($ === $$ && $ === $$$) {
            setTimeout(() => {
              message.channel.send(`You WON! 500 ${config.CURRENCY}`)
            }, 2000);
            try{
                await profileModel.findOneAndUpdate(
                    {
                        userID: message.author.id
                    },{
                        $inc: {
                            coins: 500,
                        }
                    })
            }catch(err){
               console.log(err);
            }
            } else {
                setTimeout(() => {
                    message.channel.send(`2 slots are equal... 200 ${config.CURRENCY}`)
                 }, 2000);
                try{
                    await profileModel.findOneAndUpdate(
                        {
                            userID: message.author.id
                        },{
                            $inc: {
                                coins: 200,
                            }
                        })
                }catch(err){
                   console.log(err);
                }
            }
        }
    }   
}