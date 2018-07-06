const Discord = require("discord.js");

module.exports.run = async(client, msg, cmds) => {

    function getTime(value) {
        let roundedSecs = Math.floor(value / 1000);
        let secs = roundedSecs % 60;
        let mins = Math.floor(roundedSecs % 3600 / 60);
        let hours = Math.floor(roundedSecs % 86400 / 3600);
        let days = Math.floor(roundedSecs / 86400);
        return (days ? days + " day" + (days == 1 ? "" : "s") + ", " : "") + ((hours || days) ? hours + " hour" + (hours == 1 ? "" : "s") + ", " : "") + ((mins || hours || days) ? mins + " minute" + (mins == 1 ? "" : "s") + " and " : "") + secs + " second" + (secs == 1 ? "" : "s");
    }

    let infoEmbed = new Discord.RichEmbed()
    .setTitle("__*Plutonium Bot Information*__")
    .setThumbnail(client.user.displayAvatarURL)
    .setColor("#EEEE00")
    .addField("Bot name", client.user.tag)
    .addField("Created On", client.user.createdAt, true)
    .addField("Created by", "SplitTrix#0695", true)
    .addField("Uptime", getTime(client.uptime), true)
    .addField("Avg. Ping", `${client.ping}ms`, true)
    .addField("Browser", client.browser, true)
    .addField("Verified", client.user.verified, true)
    .setFooter("If any help is needed, join https://discord.gg/xuYHBXw");

    msg.channel.send(infoEmbed);
}

module.exports.help = {
    name: "botinfo"
}