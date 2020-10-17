module.exports = {
	name: 'getscore',
	description: 'Write note of the song currently playing',
	args: true,
	execute(message, args, namesong) {
		
		if(require.cache[data]){
		delete require.cache[require.resolve(`data.json`)];}
		
		var data = require('../data.json');
		
		for (const song of data) {
			if(song.Name == namesong){
				message.channel.send(namesong + " score is :" + song.note);
			}
		}
		
	},
};	