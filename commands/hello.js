module.exports = {
    name: 'hello',
    description: "Hello Comrade",
    execute(message, args){
        message.channel.send('Hello Comrade!');
    }
}