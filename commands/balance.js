const Discord = require("discord.js");

module.exports.run = async (client, msg, cmds, server) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot check your balance in a Direct Message").then(msg=>{msg.delete(7500)});
    if(!server.members[msg.author.id]) return msg.reply("There was an error fetching your data!").then(msg=>{msg.delete(7500)});
    let user = server.members[msg.author.id];
    let b = Math.floor(user.cash) / 100
    var mEmbed = new Discord.RichEmbed()
    .setTitle("__*Your Balance*__")
    .setColor("#00EE00")
    .setThumbnail(msg.author.displayAvatarURL)
    .setDescription(`$${b}`);

    msg.delete();
    msg.channel.send(mEmbed).then(msg=>{msg.delete(7500)});
}

module.exports.help = {
    name: "balance"
}