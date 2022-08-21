module.exports = {
	name: 'error',
	execute(error) {
		console.error('Client encountered an error:', error);
	},
};