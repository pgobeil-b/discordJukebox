module.exports = {
	name: 'score',
	description: 'Score the song playing',
	args: true,
	execute(message, args, namesong) {
		
		const fs = require('fs');

		if(require.cache[data]){
		delete require.cache[require.resolve(`data.json`)];}
		
		var data = require('../data.json');
		
		for (const song of data) {
			if(song.Name == namesong){
				if(song.NbrNote==0){
					var NbrNote = 1;
					var note = Number(args);
				}else{
					var NbrNote = song.NbrNote + 1;
					var note = (song.note * (NbrNote-1)  / NbrNote) +  Number(args)/ ((NbrNote));
				}

				 // Calcul new note
				song.NbrNote = NbrNote;
				song.note = note;
				
			}
			
		}
		
		fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
	},
};	