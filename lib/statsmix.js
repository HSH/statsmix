// StatsMix.js 0.0.1

(function() {

var qs = require("querystring"),
	http = require("http"),
	statsmixfork = require("./statsmixfork-parent");

function StatsMix(options) {
	if (typeof (options) !== 'object')
		throw new TypeError('options (Object) required');
	if (typeof (options.apikey) !== 'string')
		throw new TypeError('options.apikey (String) required');

	this.host = "api.statsmix.com";
	this.apikey = options.apikey;
}

StatsMix.prototype.track = function(options, successCallback, errorCallback) {
    var self = this;
	var querystring = {
		"name" : options.name,
		"value": options.value,
		"generated_at": options.generated_at,
		"meta": JSON.stringify(options.meta),
		"ref_id": options.ref_id,
		"profile_id": options.profile_id,
		"api_key": this.apikey
	},
	opts = {
		host: "",
		port: 3128,
		path: "http://api.statsmix.com/api/v2/track?" + qs.stringify(querystring),
		"headers": {
			"host": "api.statsmix.com",
			"User-Agent": "curl/7.21.4 (universal-apple-darwin11.0) libcurl/7.21.4"
		}
	};
	
	var req = http.request(opts, function(res) {
		if (successCallback) {
			successCallback(res);
		}
	});

	req.on('error', function(e) {
		if (errorCallback) {
			errorCallback(e);
		}
	});

	req.end();
}

function createClient(options) {
	return new StatsMix(options);
}

function forkClient(options) {
	return new statsmixfork.StatsMixFork(options);
}

exports.createClient = createClient;
exports.forkClient = forkClient;

}).call(this);