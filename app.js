const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Hello');
});

client.on('guildMemberAdd', (member, message) => {
  let channel = member.guild.channels.find("name", "welcome");

  let embed = new Discord.RichEmbed()
    .setColor('GREEN')
    .setAuthor(member.user.username + "#" +member.user.discriminator + " ("+member.user.id+")", member.user.displayAvatarURL)
    .setTimestamp()
    .setFooter('Member Joined')
  channel.send(embed);
});

client.login(process.env.TOKEN);