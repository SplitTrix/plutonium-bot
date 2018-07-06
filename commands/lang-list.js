const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds, servers) => {

    let langList = new Discord.RichEmbed()
    .setTitle("Language List")
    .setDescription("Use the two letters in the translation.")
    .setColor("CCd966")
    .addField("English", "en")
    .addField("Esperanto", "eo")
    .addField("Spanish", "es")
    .addField("Russian", "ru")
    .addField("Arabic", "ar")
    .addField("Bulgarian", "bg")
    .addField("Korean", "ko")
    .addField("Japanese", "ja")
    .addField("Chinese", "zh")
    .addField("Irish", "ga")
    .addField("Norwegian", "no")
    .addField("Mongolian", "mn")
    .addField("Romanian", "ro")
    .addField("Italian", "it")
    .addField("German", "de")
    .addField("Dutch", "dl")
    .addField("Polish", "pl")
    .addField("Hebrew", "he")
    .addField("Greek", "el")
    .addField("Persian", "fa")
    .addField("French", "fr")
    .addField("Portuguese", "pt");

    let langList2 = new Discord.RichEmbed()
    .setColor("CCd966")
    .addField("Swedish", "sv")
    .addField("Turkish", "tr")
    .addField("Ukrainian", "uk")
    .addField("Vietnamese", "vi")
    .addField("Swahili", "sw")
    .addField("Zulu", "zu");

    msg.author.send(langList);
    msg.author.send(langList2);

}

module.exports.help = {
    name: "lang-list"
}