module.exports = {
	name: 'catchsong',
	description: 'Catch the song playing',
	args: true,
	execute(message) {
		const fs = require('fs');
		message.embeds.forEach((embed) => {

		if(require.cache[data]){
		delete require.cache[require.resolve(`data.json`)];}
		
		var data = require('../data.json');
		
		if(typeof embed.title !== 'undefined'){
		if(embed.title.substring(0,11) == "Now Playing"){
		
		// Load database :
		
		// Get the song playing information :
		descr = embed.description;
		namesong = descr.substring((descr.indexOf("[") + 1), descr.indexOf("]"));
		webadd = descr.substring((descr.indexOf("]") + 2),descr.indexOf("\n")-1);
		time = descr.substring((descr.indexOf("Length")+9),descr.indexOf("Requested")-3);
		
		//Check if song already in db
		var oldsong = false;
		for (const song of data) {
			if(song.Name == namesong){
				song.NbrOfView = song.NbrOfView + 1;
				oldsong = true;
			}
			
			console.log(song.Name);
		}
		if(oldsong == false){ //Add new song to the dataset :
			data.push({
				 Name : namesong,
				 Link: webadd,
				 Time : time,
				 NbrOfView : 1,
				 Note : 0,
				 NbrNote : 0
			});
			}}
		//console.log(data);
		console.log(data);
		
		fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));
		}});
	},
};