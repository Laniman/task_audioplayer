export const play = (track) => {
	return {
		type: "TRACK_PLAYING",
		payload: track
	}
};