const Discord = require("discord.js");
const fs = require("fs");

module.exports.warn = async(client, msg, cmds, servers) => {
    
    if(!cmds[0]) return msg.reply("You need to mention a user to warn!");
    let user = msg.guild.member(msg.mentions.users.first());
    if(!user) return msg.reply("That user does not exist!");
    if(!servers.members[user.id]) return msg.reply(`There was an error fetching ${user}'s data!`);
    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You do not have the permissions to warn!");
    let reason = cmds.join(" ").slice(22);
    if(!reason) reason = " **not given**.";

    servers.members[user.id].warns++;
    fs.writeFile("../servers.json", JSON.stringify(servers), (err) => {if(err) console.log(err)});

    let warnEmbed = new Discord.RichEmbed()
    .setTitle("‼️ You have been warned ‼️")
    .setColor("#FF0000")
    .setDescription(`${user} has been warned for ${reason}`)
    .addField("This user now has: ", `${servers.members[user.id].warns} warnings.`);

    msg.channel.send(warnEmbed).then(msg=>{msg.delete(7500)});

}

module.exports.help = {
    name: "warn"
}