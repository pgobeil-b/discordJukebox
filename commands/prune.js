module.exports = {
	name: 'prune',
	description: 'Prune up to 99 messages.',
	args: 'true',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;

		if (isNaN(amount)) {
			return message.reply('Un nombre valide svp.');
		} else if (amount <= 1 || amount > 100) {
			return message.reply('entre 1 et 99 svp.');
		}

		message.channel.bulkDelete(amount, true).catch(err => {
			console.error(err);
			message.channel.send('there was an error trying to prune messages in this channel!');
		});
	},
};