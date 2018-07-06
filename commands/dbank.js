const Discord = require("discord.js");
const fs = require("fs");



module.exports.run = async (client, msg, cmds, servers) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot use that command in a Direct Message!").then(msg => {msg.delete(5000)});
    let user = servers.members[msg.author.id];
    if(!cmds[0]) return msg.reply("You need an amount to deposit into your bank!").then(msg => {msg.delete(5000)});
    let amount = cmds[0];
    if(!user) return msg.reply("There was a problem fetching your data!").then(msg => {msg.delete(5000)});
    if(amount*100 > user.cash) return msg.reply("You do not have the sufficient funds to store that much!").then(msg => {msg.delete(5000)});0
    if(amount*100 < 1) return msg.reply("You cannot store that little of an amount in the bank!").then(msg => {msg.delete(5000)});

    let successEmbed = new Discord.RichEmbed()
    .setTitle("✅ Success! ✅")
    .setColor("#dda152")
    .setDescription(`${amount} was successfully added to your bank!`);

    user.cash = Math.floor(user.cash) - Math.floor(amount*100);
    user.bank = Math.floor(user.bank) + Math.floor(amount*100);
    fs.writeFile("../servers.json", JSON.stringify(servers), (err) => {if(err) console.log(err)});
    msg.delete();
    msg.channel.send(successEmbed).then(msg=>{msg.delete(12500)});

}

module.exports.help = {
    name: "dbank"
}