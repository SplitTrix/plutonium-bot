var urban = require('urban'),
    def;


const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds, servers) => {

    if(!cmds[0]) return msg.reply("You must input something!");
    def = urban(cmds.join(' '));
    def.first(function(json) {
        if(!json) {
            let errorEmbed = new Discord.RichEmbed()
            .setTitle(":x: __*Error*__ :x:")
            .setColor("#FF3333")
            .setDescription("Cannot find that on the urban dictionary!");
            msg.channel.send(errorEmbed).then(msg=>{msg.delete(10000)});
            return;
        }

        let urbanEmbed = new Discord.RichEmbed()
        .setTitle(`'${cmds.join(" ")}' on :blue_book: Urban Dictionary :books:`)
        .setColor("#AA00FF")
        .setDescription(json.definition);

        msg.channel.send(urbanEmbed);
    });

}

module.exports.help = {
    name: "urban"
}