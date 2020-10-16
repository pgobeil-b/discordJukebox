module.exports = {
	name: 'catchsong',
	description: 'Catch the song playing',
	args: true,
	execute(message) {
		message.embeds.forEach((embed) => {
		
		if(embed.title.substring(0,11) == "Now Playing"){
		descr = embed.description;
		namesong = descr.substring((descr.indexOf("[") + 1), descr.indexOf("]"));
		webadd = descr.substring((descr.indexOf("]") + 2),descr.indexOf("\n")-1);
		time = descr.substring((descr.indexOf("Length")+9),descr.indexOf("Requested")-1);
		
		//console.log(time);
		
		}});
	},
};