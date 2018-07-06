const Discord = require("discord.js");

module.exports.run = async (client, msg, cmds) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot use this command in a Direct Message!");
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("You are not allowed to change the name of the bot!");
    if(!cmds[0]) return msg.reply("You need a name to change the bot's nickname!");
    let name = cmds.join(" ");
    msg.guild.members.find(`id`, client.user.id).setNickname(name);
    let successEmbed = new Discord.RichEmbed()
    .setTitle("✅ Success! ✅")
    .setColor("#00FF00")
    .setDescription(`Name was successfully changed to ${name}`);

    msg.channel.send(successEmbed).then(msg=>{msg.delete(5000)});


}

module.exports.help = {
    name: "bnick"
}