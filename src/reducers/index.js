import {combineReducers} from 'redux';
import TracksReducers from './audiotrack';
import PlayingTrack from './audiotrack-playing';
import CurrentTime from './current-time';

const allReducers = combineReducers ({
	tracks: TracksReducers,
	playing: PlayingTrack,
	currentTime: CurrentTime
});

export default allReducers;