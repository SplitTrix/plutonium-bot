const Discord = require("discord.js");


module.exports.run = async(client,msg,cmds,servers) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot use that command in a Direct Message.");
    if(!cmds[0]) return msg.reply("You need to input a user to kick.");
    if(!msg.member.hasPermission("KICK_MEMBERS") && msg.author.tag != "SplitTrix#0695") return msg.reply("You are not allowed to kick!");
    let kickUser = msg.guild.member(msg.mentions.users.first());
    if(!kickUser) return msg.reply("That user does not exist!");
    let reason;
    if(cmds[1]) {
        reason = cmds.slice(1).join(" ");
    } else {
        reason = "not given.";
    }

    let kickEmbed = new Discord.RichEmbed()
    .setColor("#00FF00")
    .setTitle("✅ Success ✅")
    .setDescription(`${kickUser} was kicked for: ${reason}`);

    msg.delete();
    kickUser.kick().catch((error) => {
        if(error) console.error; msg.reply("I am unable to kick that user!").then(msg=>{msg.delete(5000)})
    })
    .then(msg.channel.send(kickEmbed)
    .then(msg=>{msg.delete(7500)}));
}

module.exports.help = {
    name: "kick"
}