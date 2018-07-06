const Discord = require("discord.js");

module.exports.run = async(client,msg,cmds) => {

    let currencyEmbed = new Discord.RichEmbed()
    .setTitle("__*Currency Help*__")
    .setColor("#CC00CC")
    .addField("$balance", "Checks your balance.")
    .addField("$gamble <amount>", "Gambles the amount of money you said with 25% of winning.")
    .addField("$bank", "Shows amount of money in your bank.")
    .addField("$dbank <amount>", "Deposits an amount into your bank.")
    .addField("$wbank <amount>", "Withdraws an amount of money from your bank.");

    let generalEmbed = new Discord.RichEmbed()
    .setTitle("__*General Help*__")
    .setColor("#CC00CC")
    .addField("$ping", "Shows the average ping of the bot.")
    .addField("$say <message>", "The bot says whatever message you tell it to say.")
    .addField("$randomnum <number>", "Shows a random number 1 to <number>.")
    .addField("$funfact", "Shows a random funfact.")
    .addField("$urban <keyword>", "Searches the keyword(s) on Urban Dictionary.")
    .addField("$warn <user> <reason(optional)>", "Warn the mentioned user.")
    .addField("$warns <user>", "Checks the amount of warns the user has.")
    .addField("$clearwarns <user> <amount(optional)>", "Clears the warnings of the mentioned user.")
    .addField("$kick <user> <reason>", "Kicks the user with the reason if specified.")
    .addField("$bulkdel <amount>", "Deletes the inputed amount of messages in your current channel.");

    let otherEmbed = new Discord.RichEmbed()
    .setTitle("__*Other Help*__")
    .setColor("#CC00CC")
    .addField("$botinfo", "Shows the info about the Plutonium bot.")
    .addField("$serverinfo", "Shows info about the current guild.")
    .addField("$bnick <name>", "Changes the bot's nickname to <name>");

    let langEmbed = new Discord.RichEmbed()
    .setTitle("__*Translate Help*__")
    .setColor("#CC00CC")
    .addField("$translate <to-language> <sentence>", "Translates the sentence you input to the language you input.")
    .addField("$lang-list", "Shows the list of languages to use for the $translate command.");

    let helpEmbed = new Discord.RichEmbed()
    .setTitle("__*Help*__")
    .setColor("#CC00CC")
    .addField("Show general commands.", "$help general")
    .addField("Show currency commands.", "$help currency")
    .addField("Show other commands.", "$help other")
    .addField("Show help about $translate command", "$help translate");

    let errorEmbed = new Discord.RichEmbed()
    .setTitle(":x: Error :x:")
    .setColor("#FF0000")
    .setDescription("That is not a help command.");

    try {
        if(!cmds[0]) {
            msg.author.send(helpEmbed);
        } else if(cmds[0] == "general") {
            msg.author.send(generalEmbed);
        } else if(cmds[0] == "currency") {
            msg.author.send(currencyEmbed);
        } else if(cmds[0] == "other") {
            msg.author.send(otherEmbed);
        } else if(cmds[0] == "translate") {
            msg.author.send(langEmbed);
        }else {
            msg.author.send(errorEmbed);
        }
    } catch(e) {
        console.log(e);
        msg.reply(" :x: I can not send you Direct Messages so I cannot help you. :x:").then(msg => {msg.delete(7500)});
    }

}

module.exports.help = {
    name: "help"
}