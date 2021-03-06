
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

const cooldowns = new Discord.Collection();
//let namesong = false;

client.on('message', message => {
	
	var fun_catch = client.commands.get("catchsong");
	var com_catch = fun_catch.execute(message);

	if(com_catch != false){
		namesong = com_catch;
	}

	//Detect if Rythm is playing a song

	//Check if the message has the right prefix
	if (!message.content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('pas en message svp');
	}

	if (command.args && !args.length) {
		let reply = `${message.author} a pas mis d'arguments`;

		if (command.usage) {
			reply += `\n svp -> ': \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		if(commandName == 'score' || commandName == 'getscore'){
			// Check if it is there is a songname
			if(typeof namesong === 'string'){
				command.execute(message, args, namesong);
			}else{
					message.channel.send("No song has been launched since the bot is on. Please wait or start a song.");
				}
			}
			else{
		command.execute(message, args);}
	
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});

client.login(token);