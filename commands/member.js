module.exports = {
    name: 'member',
    description: "Display server member count",
    execute(message, args){
        message.channel.send(`Total Member: ${message.guild.memberCount}`);
    }
}