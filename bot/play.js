const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('../conf.json');
const options = {fetchAllMembers: true, messageCacheMaxSize: -1 };
//const options = {fetchAllMembers: true, messageCacheMaxSize: -1, messageCacheLifetime:10000 };
const client = new Discord.Client(options);
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands');

for (const file of commandFiles) {
    if (file.match(/.*\.js$/)){
        const command = require(`../commands/${file}`);
        console.log(command.name);
	client.commands.set(command.name, command);
	}
}

client.on('ready', () => {
		console.log('Ready!');
});

client.on('message',async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/); 
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
        client.commands.get(command).execute(client, message, args);
    } 
    catch (error) {
        console.error(error);
        message.reply("Lo siento 😱!! ```markdown\n Prueba [ñ?](Para verificar si eres tú o soy yo) ```😍")
    }
});

client.login(token);
