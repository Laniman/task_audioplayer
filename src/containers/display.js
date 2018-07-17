import React, {Component} from 'react';
import {connect} from 'react-redux';

class Display extends Component {
	render() {
		
		return (
			//<audio src={this.props.track.source} controls autoplay="autoplay"></audio>
			<div className="display">
				<div className="previous"></div>
				<div className="play"></div>
				<div className="next"></div>
				<input type="range" min="1" max="100" defaultValue="90" className="volumeBar" id="volumeBar"/>
				<input type="range" min="1" max="100" defaultValue="0" className="progressBar" id="progressBar"/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		track: state.playing
	};
}

export default connect(mapStateToProps)(Display);