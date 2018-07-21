export default function (state=null, action) {
	switch (action.type) {
		case 'PLAY_ANOTHER_TRACK':
			return action.payload;
		default:
			return state;
	}
}