const Discord = require('discord.js');
const client = new Discord.Client();

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

client.on("message", (message) => {
  let prefix = 'code, ';

  if(message.content == prefix + 'emit') {
    client.emit('guildMemberAdd', message.member || await message.guild.fetchMember(message.author));
  }
});

client.login(process.env.TOKEN);