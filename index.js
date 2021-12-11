//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
/**
 * Module Imports
 */
const { Client, Collection } = require("discord.js");
const { readdirSync } = require("fs");
const { join } = require("path");
const { TOKEN, PREFIX } = require("./util/Util");
const i18n = require("./util/i18n");
const mongoose = require('mongoose');
const config = require("./config.json");
const profileModel = require('./models/profileSchema');
const cron = require('cron');

const client = new Client({
  disableMentions: "everyone",
  restTimeOffset: 0
});

client.login(TOKEN);
client.commands = new Collection();
client.prefix = PREFIX;
client.queue = new Map();
const cooldowns = new Collection();
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Client Events
 */
client.on("ready", () => {
  console.log(`${client.user.username} ready!`);
  client.user.setActivity(`${PREFIX}help and ${PREFIX}play`, { type: "LISTENING" });
});
client.on("warn", (info) => console.log(info));
client.on("error", console.error);

/**
 * Import all commands
 */
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

mongoose.connect(config.MONGODB_SRV, {
  useNewUrlParser: true,
  useUnifiedTopology: true//,
  //useFindAndModify: false
}).then(()=>{
  console.log('Connected to MongoDB')
}).catch((err)=>{
  console.log(err)
});

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(PREFIX)})\\s*`);
  if (!prefixRegex.test(message.content)) return;

  let profileData;
  try {
    profileData = await profileModel.findOne({ userID: message.author.id });
    if(!profileData){
      let profile = await profileModel.create({
        userID: message.author.id,
        serverID: message.guild.id,
        coins: 1000,
        bank: 0
    });     
    }
  }catch(err) {
    console.log(err)
  }
  
  let scheduledDailyReward = new cron.CronJob('00 00 6 * * *', async () => {
    await profileModel.updateMany({}, {
      $set: {
          reward: 0,
      },
    }
  );
  });        
  scheduledDailyReward.start()
   
  let scheduledInterest = new cron.CronJob('1 0 * * SUN', async () => {
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
                });
        }catch(err){
            console.log(err);
        }
    }
  });
              
  scheduledInterest.start()

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
    }catch(err){
        console.log(err);
    }
  });
  scheduledLotto.start()

  const [, matchedPrefix] = message.content.match(prefixRegex);

  const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Collection());
  }

  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 1) * 1000;

  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        i18n.__mf("common.cooldownMessage", { time: timeLeft.toFixed(1), name: command.name })
      );
    }
  }

  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, profileData);
  } catch (error) {
    console.error(error);
    message.reply(i18n.__("common.errorCommand")).catch(console.error);
  }
});
