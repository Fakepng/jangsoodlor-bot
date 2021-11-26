const { MessageEmbed } = require("discord.js");
const i18n = require("../util/i18n");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: i18n.__("help.description"),
  execute(message) {
    let helpEmbed = new MessageEmbed()
      .setTitle(i18n.__mf("help.embedTitle", { botname: message.client.user.username }))
      .setDescription(i18n.__("help.embedDescription"))
      .setColor("#F8AA2A")
      .addFields(
        { name: 'Music', value: 'loop(l), lyrics(ly), move(mv), np, pause, play(p), playlist(pl), queue(q), remove(rm), resume(r), search, shuffle, skip(s), skipto(st), stop, volume(v)' },
        { name: 'Orginal', value: 'help(h), invite, ping, uptime' },
        { name: 'Information', value: 'avatar, axolotl, bored, cat, covid, dict, dog, duck, fact, food, forza, fox, gif, http, iss, joke, member, meme, number, pic, quote, salim, waifu' },
        { name: 'Response', value: 'abottleofwater(abow), hello, joker, lanna, rules, say' },
        { name: 'Game', value: 'flip, tictactoe(ttt)' },
        { name: 'Economy', value: 'balance(bal), deposit(dep), pay, withdraw(wd)' },
        { name: 'Need help', value: 'Type [command] help' },
      );

    helpEmbed.setTimestamp();
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
