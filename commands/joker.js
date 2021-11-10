var array = [
    ["Smile, Because It Confuses People. Smile, Because It's Easier Than Explaining What Is Killing You Inside."],
];

module.exports = {
    name: 'joker',
    description: "Joker Quotes!",
    execute(message, args){
        const randomElement = array[Math.floor(Math.random() * array.length)];
        message.channel.send(randomElement);
    }
}