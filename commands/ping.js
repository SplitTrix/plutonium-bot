const Discord = require("discord.js");

module.exports.run = async (client, msg, cmds, m) => {
    let pingEmbed = new Discord.RichEmbed()
    .setTitle("Pong!")
    .setColor("#00FF00")
    .setDescription(`Average ping: ${client.ping} ms`)
    .setFooter("https://discord.gg/sBXygMh");

    msg.channel.send(pingEmbed);
}

module.exports.help = {
    name: "ping"
}