const Discord = require("discord.js");
const translate = require("google-translate-api");

let langlist = [
    "en",
    "eo",
    "es",
    "ru",
    "no",
    "zh",
    "ja",
    "vi",
    "mn",
    "ar",
    "bg",
    "ko",
    "ga",
    "ro",
    "it",
    "de",
    "dl",
    "pl",
    "he",
    "el",
    "fa",
    "fr",
    "pt",
    "sv",
    "tr",
    "uk",
    "sw",
    "zu",
    "af",
    "sq",
    "hi",
    "am",
    "az",
    "eu",
    "be",
    "bn",
    "ce",
    "bs",
    "ny",
    "co",
    "hr",
    "cs",
    "da",
    "et",
    "fl",
    "fi",
    "fj",
    "gl",
    "gu",
    "ka",
    "ht",
    "ha",
    "hi",
    "hu",
    "is",
    "id",
    "jv",
    "kn",
    "kk",
    "ku",
    "ky",
    "lo",
    "lv",
    "la",
    "lt",
    "lb",
    "mk",
    "mg",
    "ms",
    "mt",
    "ml",
    "mi",
    "mr",
    "ne",
    "ps",
    "pa",
    "sm",
    "gd",
    "sr",
    "sn",
    "si",
    "sk",
    "sk",
    "sl",
    "so",
    "su",
    "tg",
    "ta",
    "te",
    "th",
    "ur",
    "uz",
    "cy",
    "xh",
    "yi",
    "yo"
];


module.exports.run = (client, msg, cmds, server) => {

    if(!cmds[0]) return msg.reply("You need to input a language and sentence to translate!");
    if(!cmds[1]) return msg.reply("You need to input a sentence to translate!");
    let lang = cmds[0];
    for (i in langlist) {
        if(langlist[i] == cmds[0]) {

            let textts = cmds.join(" ").slice(3);


            translate(textts, {to: cmds[0]}).then(res => {
                let langEmbed = new Discord.RichEmbed()
                .setTitle("Translation")
                .setColor("5FE9A0")
                .addField("Translated From", `${res.from.language.iso}`)
                .addField("Translated To", cmds[0])
                .addField("Untranslated Text", textts)
                .addField("Translated Text", `${res.text}`);
                msg.channel.send(langEmbed);
            }).catch(err => {
                console.error(err);
            });

            return;
        }
        if (i == langlist.length - 1) {
            return msg.channel.send("That is not an ISO 639-1 code!")
        }
    }

}

module.exports.help = {
    name: "translate"
}