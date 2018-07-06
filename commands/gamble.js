const Discord = require("discord.js");
const fs = require("fs");


module.exports.run = async (client, msg, cmds, server) => {

    if(msg.channel.type == "dm") return msg.reply("You cannot gamble in a DM.");
    let user = server.members[msg.author.id];
    if(!cmds[0]) return msg.reply("You need to enter an amount to gamble.").then(msg => {msg.delete(7500)});
    if(!user.cash || user.cash == 0) return msg.reply("You do not have any money to gamble!").then(msg => {msg.delete(5000)});
    if((cmds[0] * 100) > user.cash) return msg.reply("You do not have the sufficient funds to gamble that amount!").then(msg => {msg.delete(5000)});
    if((cmds[0] * 100) < 1) return msg.reply("You can not gamble that little amount of money!").then(msg => {msg.delete(5000)});
    let gAmount = cmds[0];
    let rNumber = Math.floor(Math.random()*8) + 1;
    
    let winEmbed = new Discord.RichEmbed()
    .setTitle("🎉 __*You Won!*__ 🎉")
    .setColor("#00FF00")
    .setDescription(`You just won $${gAmount}!`);

    let doubleEmbed = new Discord.RichEmbed()
    .setTitle("🎉 __*You Won Double!*__ 🎉")
    .setColor("#00FF00")
    .setDescription(`You just won $${gAmount * 2}`);

    let loseEmbed = new Discord.RichEmbed()
    .setTitle("❌ __*You Lost!*__ ❌")
    .setColor("#FF0000")
    .setDescription(`You just lost $${gAmount}`);

    if(rNumber == 2 || rNumber == 4 || rNumber == 6) {
        user.cash = user.cash + (gAmount * 100);
        fs.writeFile("../servers.json/", JSON.stringify(server), (err) => {if(err) console.log(err)});
        msg.channel.send(winEmbed).then(msg => {msg.delete(15000)});
    } else if(rNumber == 5) {
        user.cash = user.cash + (gAmount * 200);  
        fs.writeFile("../servers.json", JSON.stringify(server), (err) => {if (err) console.log(err)});
        msg.channel.send(doubleEmbed).then(msg => {msg.delete(15000)});
    } else {
        user.cash = user.cash - (gAmount * 100);
        fs.writeFile("../servers.json/", JSON.stringify(server), (err) => {if(err) console.log(err)});
        msg.channel.send(loseEmbed).then(msg => {msg.delete(15000)});
    }

}

module.exports.help = {
    name: "gamble"
}