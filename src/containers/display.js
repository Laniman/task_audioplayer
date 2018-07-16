import React, {Component} from 'react';
import {connect} from 'react-redux';

class Display extends Component {
	render() {
		if (!this.props.track) {
			return (<p>Nothing playing</p>)
		}
		return (
			<audio src={this.props.track.source} controls></audio>
		);
	}
}

function mapStateToProps(state) {
	return {
		track: state.playing
	};
}

export default connect(mapStateToProps)(Display);