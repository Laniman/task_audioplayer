export default function (state=null, action) {
	switch (action.type) {
		case 'CURRENT_TIME':
			return action.payload;
		default:
			return state;
	}
}