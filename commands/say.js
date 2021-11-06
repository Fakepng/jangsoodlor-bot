module.exports = {
    name: 'say',
    description: "Say",
    execute(message, args){
        message.channel.send(args);
    }
}