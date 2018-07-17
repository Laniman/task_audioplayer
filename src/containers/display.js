import React, {Component} from 'react';
import {connect} from 'react-redux';

class Display extends Component {
	render() {
		return (
			<div className="display">
				<div className="previous"></div>
				<div className="play" onClick={() => {
					if (document.getElementsByClassName('play').length > 0) {
						let playButton = document.getElementsByClassName('play');
						playButton[0].classList.add('pause');
						playButton[0].classList.remove('play');
					}
					else {
						let playButton = document.getElementsByClassName('pause');
						playButton[0].classList.add('play');
						playButton[0].classList.remove('pause');
					}
				}}></div>
				<div className="next"></div>
				<input type="range" min="1" max="100" defaultValue="90" className="volumeBar" id="volumeBar"/>
				<input type="range" min="1" max="100" defaultValue="0" className="progressBar" id="progressBar"/>
				<div className="elapsedTime">0:59</div>
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