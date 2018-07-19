export const play = (track) => {
	return {
		type: "TRACK_TO_PLAY",
		payload: track
	}
};

export const currentTime = (track) => {
	let minutes = Math.floor(track.currentTime / 60);
	let seconds = Math.floor(track.currentTime - 60 * minutes);
	seconds = seconds.toString();
	if (seconds.length === 1) {
		seconds = '0' + seconds;
	}
	let resultTime = minutes + ":" + seconds;
	return {
		type: "CURRENT_TIME",
		payload: resultTime
	}
};