const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds, servers) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot check your bank in a Direct Message!").then(msg => {msg.delete(5000)});
    let user = servers.members[msg.author.id];
    if(!user) return msg.reply("There was a problem fetching your data!").then(msg => {msg.delete(5000)});
    
    let bankEmbed = new Discord.RichEmbed()
    .setTitle("💰 __*Bank*__ 💰")
    .setColor("#dda152")
    .setDescription(`You have $${user.bank/100} in the bank!`);

    msg.delete();
    msg.channel.send(bankEmbed).then(msg => {msg.delete(15000)});


}

module.exports.help = {
    name: "bank"
}