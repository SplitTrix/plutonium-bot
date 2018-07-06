const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds) => {

    let errorEmbed = new Discord.RichEmbed()
    .setTitle(":warning: ERROR :warning:")
    .setColor("#FF0000")
    .setDescription("You need to say a number!");
    let errorEmbed2 = new Discord.RichEmbed()
    .setTitle(":warning: ERROR :warning:")
    .setColor("#FF0000")
    .setDescription("You need a number above 1 and below 10,000!");
    
    if(!cmds[0]) return msg.channel.send(errorEmbed).then(msg => {msg.delete(5000)});
    if(cmds[0] > 10000 || cmds[0] < 2) return msg.channel.send(errorEmbed2).then(msg => {msg.delete(5000)});

    let rn = Math.floor(Math.random()*cmds[0])+1;

    let rnEmbed = new Discord.RichEmbed()
    .setTitle("Random Number")
    .setColor("#CC00CC")
    .setDescription(rn);

    msg.channel.send(rnEmbed);
}

module.exports.help = {
    name: "randomnum"
}