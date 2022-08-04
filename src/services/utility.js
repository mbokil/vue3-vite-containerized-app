// utility service

// console.log wrapper disables logging in prod must be function to access arguments
function log() {
	if (APP_PROPS.VITE_LOGGING === true) {
		if (arguments === undefined || arguments.length === 0) {
			console.log('Params missing in log service');
			return;
		}

		if(typeof(console) !== undefined) {
			console.log.apply(console, arguments);
		}
	} 
}

export { log }