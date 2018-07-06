const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds, servers) => {

    if(!msg.member.hasPermission("MANAGE_MESSAGES")) return msg.reply("You are not allowed to do that!");
    let amount = cmds[0];
    if(Math.floor(amount) > 0  && Math.floor(amount) < 2501) {
        msg.channel.bulkDelete(Math.floor(amount) + 1).catch(console.error);
        msg.channel.send(`Deleted ${Math.floor(amount)} messages in the channel, ${msg.channel}`).then(msg=>{msg.delete(7500)});
    } else {
        msg.reply("That number is less than 1, greater than 2500, or is not a real number.")
        return;
    }

}

module.exports.help = {
    name: "bulkdel"
}