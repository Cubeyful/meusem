const Discord = require('discord.js');
const client = new Discord.Client();

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

  if(message.content == prefix + 'emit') {
    if(message.author.id != '566692683838521364') return;
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }

  if(message.content == prefix + 'red') {
    let list = [
      "white",
      "black",
      "blue",
      "green",
      "yellow"
    ]
    if(message.member.roles.some(r=>list.includes(r.name))) {
      message.member.removeRole(r.id)
      let role = message.guild.roles.find("name", "red")
      if(!role) message.guild.createRole({name:'red',color:'red'});
      message.member.addRole(role);
      let embed = new Discord.RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`You have been successfully moved to RED`)
        .setFooter(`Color Change`)
      message.channel.send(embed);
    } else {
      let role = message.guild.roles.find("name", "red")
      if(!role) message.guild.createRole({name:'red',color:'red'});
      message.member.addRole(role);
      let embed = new Discord.RichEmbed()
        .setColor('RED')
        .setAuthor(message.author.username, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`You have been successfully been set to RED`)
        .setFooter(`Color Change`)
      message.channel.send(embed);
    }
  }
});

client.login(process.env.TOKEN);
