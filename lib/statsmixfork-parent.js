(function() {
var cp = require('child_process');

function StatsMixFork(options) {
	if (typeof (options) !== 'object')
		throw new TypeError('options (Object) required');
	if (typeof (options.apikey) !== 'string')
		throw new TypeError('options.apikey (string) required');

    this.child = cp.fork('node_modules/statsmix/lib/statsmixfork-client.js', [options.apikey]);
}

StatsMixFork.prototype.track = function(options, successCallback, errorCallback) {
	this.child.send({
            "function": "track",
            "options": options
        });
}

exports.StatsMixFork = StatsMixFork;

}).call(this);