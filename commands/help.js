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
        { name: 'More', value: 'abottleofwater, avatar, axolotl, bored, cat, covid, dict, dog, duck, fact, food, forza, fox, gif, hello, http, iss, joke, joker, lanna, member, meme, number, pic, quote, rules, salim, say, waifu' },
        { name: 'Need help', value: 'Type [command] help => (Only with "More" command)' },
      );

    helpEmbed.setTimestamp();
    return message.channel.send(helpEmbed).catch(console.error);
  }
};
