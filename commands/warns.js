const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds, servers) => {

    if(msg.channel.type == "dm") return msg.reply("You can't use that command in a Direct Message!").then(msg=>{msg.delete(7500)});
    let user;
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) user = msg.author.id;
    if(!cmds[0]) user = msg.author.id;
    if(cmds[0] && msg.member.hasPermission("MANAGE_MESSAGES")) user = msg.guild.member(msg.mentions.users.first()).id;
    if(!user) return msg.reply("That user does not exist!");
    if(!servers.members[user]) return msg.reply("There was an error fetching the user's data!").then(msg=>{msg.delete(7500)});

    let name = msg.guild.members.find(`id`, user);
    var mEmbed = new Discord.RichEmbed()
    .setTitle("__*Warnings*__")
    .setColor("#00EE00")
    .setThumbnail(msg.author.displayAvatarURL)
    .setDescription(`${name} has ${servers.members[user].warns} warnings.`);

    msg.channel.send(mEmbed).then(msg=>{msg.delete(10000)});

}

module.exports.help = {
    name: "warns"
}