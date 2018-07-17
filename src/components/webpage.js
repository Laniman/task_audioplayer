import React from 'react';
import TrackList from '../containers/track-list';
import Display from '../containers/display';

const WebPage = () => (
	<div className="player">
		<TrackList />
		<Display />
	</div>
);

export default WebPage;