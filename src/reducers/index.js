import {combineReducers} from 'redux';
import TracksReducers from './audiotrack';
import PlayingTrack from './audiotrack-playing';
import CurrentTime from './current-time';
import PlayAnotherTrack from './play-another-track';

const allReducers = combineReducers ({
	tracks: TracksReducers,
	playing: PlayingTrack,
	currentTime: CurrentTime,
	playAnotherTrack: PlayAnotherTrack
});

export default allReducers;