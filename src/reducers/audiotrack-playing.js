export default function (state=null, action) {
	switch (action.type) {
		case 'TRACK_PLAYING':
			return action.payload;
		default:
			return state;
	}
}