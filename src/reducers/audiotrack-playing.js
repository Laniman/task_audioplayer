export default function (state=null, action) {
	switch (action.type) {
		case 'TRACK_TO_PLAY':
			return action.payload;
		default:
			return state;
	}
}