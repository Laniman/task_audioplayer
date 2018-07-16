import {combineReducers} from 'redux';
import TracksReducers from './audiotrack';
import PlayingTrack from './audiotrack-playing';

const allReducers = combineReducers ({
	tracks: TracksReducers,
	playing: PlayingTrack
});

export default allReducers;