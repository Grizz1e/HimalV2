module.exports = {
	name: 'shardError',
	execute(error) {
		console.error('A websocket connection encountered an error:', error);
	},
};