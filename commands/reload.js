module.exports = {
	name: 'reload',
	description: 'Reloads la commande',
	args: true,
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
			|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) {
			return message.channel.send(`C'est pas une commande ça \`${commandName}\`, ${message.author}!`);
		}

		delete require.cache[require.resolve(`./${command.name}.js`)];

		try {
			const newCommand = require(`./${command.name}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			message.channel.send(`Commande \`${command.name}\` est reloaded!`);
		} catch (error) {
			console.error(error);
			message.channel.send(`je peux pas reload \`${command.name}\`:\n\`${error.message}\``);
		}
	},
};