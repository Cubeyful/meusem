const Discord = require('discord.js');
const client = new Discord.Client();

const db = require('quick.db');

var color = [
  "white",
  "red",
  "black",
  "blue",
  "yellow",
  "green",
  "cyan"
];

var colorred = "\x1b[31m";
var colorblue = "\x1b[34m";
var coloryellow = "\x1b[33m";
var colorgreen = "\x1b[32m";
var colorcyan = "\x1b[36m";
var colornormal = "";
var colorreset = "\x1b[0m"; // DON'T FORGET RESET FONT

function pnt(text, color) {
  if (color === undefined) color = cNormal;
  var timestamp = "[" + new Date().toLocaleTimeString('en-CA') + "] ";
  colorLog = color;
  logText = text;
  console.log(timestamp + colorLog + text + cReset);
}

function reset(message, member){

  var arrayLength = color.length;
  for (var i = 0; i < arrayLength; i++) {
      //Do something
      //let roleArray = message.guild.roles.find("name", rolesColors[i]);
      var roleArray = message.guild.roles.find(role => role.name === color[i]);
      member.removeRole(roleArray).catch(console.error);
    }
}
client.on('ready', () => {
  console.log('Hello');
  client.user.setActivity('the precious code', { type: 'WATCHING' })
});

client.on('guildMemberAdd', (member) => {
  let channel = member.guild.channels.find("name", "welcome");

  let embed = new Discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor(member.user.username + "#" +member.user.discriminator + " ("+member.user.id+")", member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Member Joined')
  channel.send(embed);
});

client.on("message", async (message) => {
  let prefix = 'code, ';

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content == prefix + 'emit') {
    if(message.author.id != '566692683838521364') return;
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }

  if(message.content == prefix + 'announcement') {
    let number = db.get(`accouncement_number`);
    let message = args.slice(1).join(" ");

    let channel = message.guild.channels.find("name", "announcements")

    let embed = new Discord.RichEmbed()
      .setColor('GREEN')
      .setAuthor('Announcement ('+number+')', message.guild.iconURL)
      .setTimestamp()
      .setDescription(message+`\n\n<@${message.guild.id}>`)
      .setFooter(`${message.author.username}`)
    channel.send(embed);

    db.add(`accountment_number`, 1);
  }
});

client.login(process.env.TOKEN);
