let childProcessState = {
	ganacheCommandOutput: '',
	runningChildProcessPID: '',
	portErrorOnProcess: false
};

function updateState(property, _data) {
	switch (property) {
		case 'ganacheCommandOutput':
			childProcessState.ganacheCommandOutput += _data;
			break;
		case 'runningChildProcessPID':
			childProcessState.runningChildProcessPID = _data;
			break;
		case 'portErrorOnProcess':
			childProcessState.portErrorOnProcess = _data;
			break;
	}
}

function getState() {
	return childProcessState;
}

module.exports = {
	updateState,
	getState
};