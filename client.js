const Discord = require("discord.js");
const client = new Discord.Client();

const request = require("request");
const ytdl = require("ytdl-core");
const getYoutubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");
const fs = require("fs");
const settings = require("./settings.json");

const prefix = "$";

let servers = require("./servers.json");
let servermusic = JSON.parse(fs.readFileSync("./servermusic.json", "utf-8"));

client.commands = new Discord.Collection();



function search_video(query, callback) {
    request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + settings["yt-api-key"], function(error, response, body) {
        var json = JSON.parse(body);
        callback(json.items[0].id.videoId);
    });
}

function playMusic(id, msg) {
    voiceChannel = msg.member.voiceChannel;

    servermusic[msg.guild.id].voiceChannel = voiceChannel;
    voiceChannel.join().then(connection=>{
        stream = ytdl("https://www.youtube.com/watch?v=" + id, {
            filter: "audioonly"
        });
            
        servermusic[msg.guild.id].dispatcher = connection.playStream(stream);
    });
}

function isYoutube(str) {
    return str.toLowerCase().indexOf("youtube.com") > -1;
}

function add_to_queue(strID, sm) {
    if(isYoutube(strID)) {
        sm.queue.push(getID(getYoutubeID(strID)));
    } else {
        sm.queue.push(strID);
    }
}

function getID(str, cb) {
    if (isYoutube(str)) {
        cb(getYoutubeID(str));
    } else {
        search_video(str, (id) => {
            cb(id);
        });
    }
}

fs.readdir("./commands/", (err, files) => {
    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() == "js");
    if(jsfile.length <= 0){
     console.log("Couldn't find the folder 'commands'");
     return;
    }

    //loads all the command files
    jsfile.forEach((f) =>{ 
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        client.commands.set(props.help.name, props);
    });
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
    client.user.setActivity('Type $help',{ type: "PLAYING"});
});


client.on("guildMemberAdd", member => {
    if (member.guild.channels.find(`name`, "general")) {
        member.guild.channels.find(`name`, "general").send(`Welcome to the guild ${member}!`);
    }

    

    if(!servers[member.guild.id].members[member.user.id]) {
        servers[member.guild.id].members[member.user.id] = {
            cash: 0,
            bank: 0,
            warns: 0
        }
    }
    fs.writeFile("./servers.json/", JSON.stringify(servers), (err) => {if(err) console.log(err)});
});

client.on("guildCreate", guild => {
    let newGuild = new Discord.RichEmbed()
    .setTitle("👋 **Hello** I am __Plutonium Bot!__ 🙌")
    .setDescription("I am here to give help to your server, " + guild.name)
    .setThumbnail("https://i.chzbgr.com/full/6996182016/hF1C53124/")
    .setColor("#70ea70")
    .addField("If you need help,", "Type __$help__ in the chat. It should send the commands to your Direct Messages!")
    .addField("And don't forget,", "Do not touch me because I am too radioactive for you to handle.");
    if(guild.channels.find(`name`, "general")) {
        guild.channels.find(`name`, "general").send(newGuild);
    } else if(guild.channels.find(`name`, "welcome")) {
        guild.channels.find(`name`, "welcome").send(newGuild);
    }
});

client.on("message", msg => {
    if(msg.author.bot) return;    
    

    if(!msg.content.startsWith(prefix) && msg.channel.type != "dm") { 

        if(!servers[msg.guild.id]) {
            servers[msg.guild.id] = { 
                name: msg.guild.name,
                members: {
                    "462070477129515009": { //bot ID
                        cash: 0,
                        bank: 0,
                        warns: 0
                    }
                }
            };
            fs.writeFile("./servers.json/", JSON.stringify(servers), (err) => {if(err) console.log(err)});
        }
    
        if(!servers[msg.guild.id].members[msg.author.id]) {
            servers[msg.guild.id].members[msg.author.id] = {
                cash: 0,
                bank: 0,
                warns: 0
            }
            fs.writeFile("./servers.json/", JSON.stringify(servers), (err) => {if(err) console.log(err)});
        }

        let dinero = servers[msg.guild.id].members[msg.author.id];
        dinero.cash++;
        fs.writeFile("./servers.json/", JSON.stringify(servers), (err) => {if(err) console.log(err)});
        return;
    } 


    var cmds = msg.content.substring(prefix.length).split(" ");
    let cmd = cmds[0].toLowerCase();

    

    if(cmd == "play") {

        if(!servermusic[msg.guild.id]) {
            servermusic[msg.guild.id] = {
                isPlaying: false,
                dispatcher: null,
                voiceChannel: null,
                queue: []
            }
            fs.writeFile("../servermusic.json", JSON.stringify(servermusic), (err) => {if(err) console.log(err)});
        }

        if(!msg.member.voiceChannel) return msg.reply("You need to be in a voice channel!");

        if(servermusic[msg.guild.id].queue.length > 0 || servermusic[msg.guild.id].isPlaying == true) {
            getID(cmds.slice(1).join(" "), (id) => {
                add_to_queue(id, servermusic[msg.guild.id]);
                fs.writeFile("../servermusic.json", JSON.stringify(servermusic), (err) => {if(err) console.error});
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.reply(` now playing **${videoInfo.title}**.` );
                });
            });
        } else {
            servermusic[msg.guild.id].isPlaying = true;
            getID(cmds.slice(1).join(" "), (id) => {
                servermusic[msg.guild.id].queue.push("placeholder");
                fs.writeFile("../servermusic.json", JSON.stringify(servermusic), (err) => {if(err) console.error});
                playMusic(id, msg);
                fetchVideoInfo(id, function(err, videoInfo) {
                    if (err) throw new Error(err);
                    msg.reply(` added **${videoInfo.title}** to queue.` );
                });
            });
        }

        return;
    }


    let commandFile = client.commands.get(cmd)

    if (msg.channel.type == "dm" && commandFile) {
        commandFile.run(client, msg, cmds.slice(1)); 
        return;
    } else if(commandFile && cmd == "warn" && msg.channel.type != "dm") {
        client.commands.get("warn").warn(client, msg, cmds.slice(1), servers[msg.guild.id]);
        return;
    } else if(commandFile)  { 
        commandFile.run(client, msg, cmds.slice(1), servers[msg.guild.id]); 
    } else {
        if (msg.content.startsWith(prefix)) {
            let errorEmbed1 = new Discord.RichEmbed()
            .setTitle("❌ Error ❌")
            .setColor("#FF0000")
            .setDescription("That is not a valid Plutonium command.");

            msg.channel.send(errorEmbed1).then(msg => {msg.delete(10000)});
        }
    }

});



client.login(settings["d-token"]);