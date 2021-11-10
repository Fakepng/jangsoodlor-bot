const config = require("../config.json");

module.exports = {
    name: 'avatar',
    description: "Show an avatar",
    execute(message, args){
        if(args == 'help') {
            message.channel.send(`Usage: ${config.PREFIX}avatar for your own avatar or ${config.PREFIX}avatar @user for @user avatar`);
        }else if (!message.mentions.users.size) {
            return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ format: 'png', dynamic: true })}`);
        }else (message.mentions.users.size)
            const avatarList = message.mentions.users.map(user => {
                return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ format: 'png', dynamic: true })}`);
            });
        
    }
}