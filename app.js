const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Hello');
});

client.login(process.env.TOKEN)
