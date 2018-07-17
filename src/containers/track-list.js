import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {play} from '../actions/index';

class TrackList extends Component {
	showList() {
		return this.props.tracks.map ((item) => {
			return (
				<li key={item.id} onClick={() => this.props.play(item)}>
				<div className="track-info">{item.artist} - {item.name}</div><div className="duration">1:00</div>
				<audio src={item.source}></audio>
				</li>
			);
		});
	}

	render() {
		return (
			<div className="tracklist">
				<input className="searchField" type="text" placeholder="Search for artists or tracks" />
				<ol>
					{this.showList ()}
				</ol>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tracks: state.tracks
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({play: play}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TrackList);