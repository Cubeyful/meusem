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

  if(member.bot) {
    let role = message.guild.roles.find("name", "")
  }
});

client.on("message", async (message) => {
  let prefix = 'code, ';

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  // if(message.content == prefix + 'emit') {
  //   if(message.author.id != '566692683838521364') return;
  //   client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  // }

  if(message.content == prefix + 'application') {
    let embed = new Discord.RichEmbed()
      .setColor('YELLOW')
      .setTimestamp()
      .setFooter('Application Handler')
      .setDescription(`◀ Developer)`)
      .setAuthor(message.author.username, message.author.displayAvatarURL);
    message.channel.send(embed);
    message.react('◀')

    const filter = (reaction, user) => {
      return ['◀'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
    .then(collected => {
      const reaction = collected.first();
  
      if (reaction.emoji.name === '◀') {
        reaction.remove();
        let embed = new Discord.RichEmbed()
          .setColor('GREEN')
          .setTimestamp()
          .setFooter(`Developer Application`)
          .setDescription('The application has started in your direct messages, please answer honestly.')
          .setAuthor(message.author.username, message.author.displayAvatarURL)
        message.channel.send(embed);

        let finish = new Discord.RichEmbed()
          .setColor('GREEN')
          .setTimestamp()
          .setFooter('Application Complete')
          .setAuthor(message.author.username, message.author.displayAvatarURL)

        let embeddm = new Discord.RichEmbed()
          .setColor('GREEN')
          .setTimestamp()
          .setFooter(`Developer Application`)
          .setDescription(`Question One\nHow old are you?`)
          .setAuthor(message.author.username, message.author.displayAvatarURL)
        message.author.send(embeddm);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
        collector.on('collect', (msg2) => {
          if(isNaN(msg2)) {
            let embed = new Discord.RichEmbed()
              .setColor('RED')
              .setTimestamp()
              .setFooter('Developer Application')
              .setDescription(`Your age has to be a number.`);
            message.author.send(embed);
          } else {
            finish.addField('Age', msg1.content)
            message.author.send(finish);
          }
        });
      } else {
        message.reply('you reacted with a thumbs down.');
      }
    })

  }

});

client.login(process.env.TOKEN);