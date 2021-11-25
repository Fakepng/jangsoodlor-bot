const config = require("../config.json");

module.exports = {
    name: 'flip',
    description: "flip",
    execute(message, args){
        if (args == 'help') {
            message.channel.send(`Usage ${config.PREFIX}flip`);
        }else{
            function doRandHT() {
                var rand = ['HEADS!','TAILS!'];
                
                return rand[Math.floor(Math.random()*rand.length)];
                }
                
            const embed = {
                "title": `The result is:`,
                "description": doRandHT(),
                "color": 7584788,
            };
            message.channel.send({ embed });
        }
    }
}