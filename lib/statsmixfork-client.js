var statsmix = require("./statsmix");

var stats = statsmix.createClient({
	"apikey": process.argv[2]
})

process.on('message', function(m) {
 	stats[m.function](m.options);
});