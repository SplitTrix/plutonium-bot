const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, msg, cmds, servers) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot use that command in a Direct Message!");
    if(!servers.members[msg.author.id]) return msg.reply("There was an error fetching your data!");
    let user;
    if(!msg.member.hasPermission("ADMINISTRATOR")) return msg.reply("You need to be an administrator in order to use this command!");
    if(!cmds[0]) user = msg.author.id;
    if(cmds[0] && msg.member.hasPermission("MANAGE_MEMBERS")) user = msg.guild.member(msg.mentions.users.first()).id;
    if(!user) return msg.reply("That user does not exist!");
    if(!servers.members[user]) return msg.reply("There was an error fetching the user's data!");
    let amount = cmds[1];
    if(amount) {
        if(Math.floor(amount) <= servers.members[user].warns && Math.floor(amount) > 0) {
            servers.members[user].warns = servers.members[user].warns - Math.floor(amount);
            fs.writeFile("../servers.json", JSON.stringify(servers), (err) => {if(err) console.log(err)});

            let name = msg.guild.members.find(`id`, user);
            let successEmbed = new Discord.RichEmbed()
            .setTitle("✅ Success! ✅")
            .setColor("#00FF00")
            .setDescription(`${Math.floor(amount)} warns were removed from ${name}'s warnings.`);

            msg.channel.send(successEmbed).then(msg=>{msg.delete(7500)});

        } else {
            msg.reply("The amount you inputed is too high or is zero or is negative!");
        }
    } else {

        servers.members[user].warns = 0;
        fs.writeFile("../servers.json", JSON.stringify(servers), (err) => {if(err) console.log(err)});

        let name = msg.guild.members.find(`id`, user);
        let successEmbed = new Discord.RichEmbed()
        .setTitle("✅ Success! ✅")
        .setColor("#00FF00")
        .setDescription(`${name}'s warnings were cleared to 0.`);

        msg.channel.send(successEmbed).then(msg=>{msg.delete(7500)});

    }

}

module.exports.help = { name: "clearwarns" }