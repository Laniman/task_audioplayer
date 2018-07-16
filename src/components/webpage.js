import React from 'react';
import TrackList from '../containers/track-list';
import Display from '../containers/display';

const WebPage = () => (
	<div>
		<h2>Tracks:</h2>
		<TrackList />
		<Display />
	</div>
);

export default WebPage;