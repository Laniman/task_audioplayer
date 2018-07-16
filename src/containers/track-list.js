import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {play} from '../actions/index';

class TrackList extends Component {
	showList() {
		return this.props.tracks.map ((item) => {
			return (
				<li onClick={() => this.props.play(item)} key={item.id}>{item.artist} - {item.name}</li>
				);
		});
	}

	render() {
		return (
			<ol>
				{this.showList ()}
			</ol>
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