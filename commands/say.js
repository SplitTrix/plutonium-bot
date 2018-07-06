const Discord = require("discord.js");


module.exports.run = async(client, msg, cmds, servers) => {

    let input = cmds.join(" ");
    if(Math.floor(Math.random() * 25) == 17) {
        msg.channel.send("No.");
    } else {
        msg.delete();
        msg.channel.send(input);
    }

}

module.exports.help = {
    name: "say"
}