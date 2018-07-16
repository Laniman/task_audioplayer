import {combineReducers} from 'redux';
import TracksReducers from './audiotrack';

const allReducers = combineReducers ({
	tracks: TracksReducers
});

export default allReducers;