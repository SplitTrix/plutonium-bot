const Discord = require("discord.js");

module.exports.run = async (client, msg, cmds) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot use that command in a Direct Message.");

    let rolez = [];
    msg.guild.roles.array().forEach(element => rolez.push(element.name));

    let siEmbed = new Discord.RichEmbed()
    .setTitle("__*Server Information*__")
    .setColor("#4f05ac")
    .setThumbnail(msg.guild.iconURL)
    .addField("Server Name", msg.guild.name)
    .addField("Server ID", msg.guild.id)
    .addField("Server Owner", `${msg.guild.owner.user.tag}`, true)
    .addField("Created At", msg.guild.createdAt, true)
    .addField("You Joined At", msg.member.joinedAt, true)
    .addField("Content Filter", msg.guild.explicitContentFilter, true)
    .addField("Large Server", msg.guild.large, true)
    .addField("Verification Level", msg.guild.verificationLevel, true)
    .addField("Member Count", msg.guild.memberCount, true)
    .addField("Region", msg.guild.region, true)
    .addField("# of roles", msg.guild.roles.size, true)
    .addField("Roles", rolez.slice(1).join(", "));

    msg.channel.send(siEmbed);

}

module.exports.help = {
    name: "serverinfo"
}