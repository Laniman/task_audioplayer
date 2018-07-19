import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {currentTime} from '../actions/index';

class Display extends Component {
	render() {
		if (!this.props.track) {
			return (
				<div className="display">
					<audio id="audioPlayer" src=""/>
					<div className="previous"></div>
					<div className="play"></div>
					<div className="next"></div>
					<input type="range" min="1" max="100" defaultValue="90" className="volumeBar" id="volumeBar"/>
					<input type="range" min="1" max="100" defaultValue="0" className="progressBar" id="progressBar"/>
					<div className="elapsedTime">0:00</div>
				</div>
			);
		}
		else {
			return (
				<div className="display">
					<audio id="audioPlayer" src={this.props.track.source} onTimeUpdate={() => {
						var thisAudio = document.getElementById('audioPlayer');
						this.props.sendCurrentTime(thisAudio);
						var pBar = document.getElementById('progressBar');
						pBar.value = Math.floor(thisAudio.currentTime / thisAudio.duration * 100);
					}} autoPlay="autoplay" onPlaying={() => {
						let playButton = document.getElementsByClassName('play');
						if (playButton[0]) {
							playButton[0].classList.add('pause');
							playButton[0].classList.remove('play');
						}
					}} onPause={() => {
						let playButton = document.getElementsByClassName('pause');
						if (playButton[0]) {
							playButton[0].classList.add('play');
							playButton[0].classList.remove('pause');
						}
					}}/>
					<div className="previous"></div>
					<div className="pause" onClick={() => {
						if (document.getElementsByClassName('pause').length > 0) {
							let playButton = document.getElementsByClassName('pause');
							playButton[0].classList.add('play');
							playButton[0].classList.remove('pause');
							let audioTrack = document.getElementById("audioPlayer");
							audioTrack.pause();
						}
						else {
							let playButton = document.getElementsByClassName('play');
							playButton[0].classList.add('pause');
							playButton[0].classList.remove('play');
							let audioTrack = document.getElementById("audioPlayer");
							audioTrack.play();
						}
					}}></div>
					<div className="next"></div>
					<input type="range" min="1" max="100" defaultValue="90" className="volumeBar" id="volumeBar"/>
					<input type="range" min="1" max="100" defaultValue="0" className="progressBar" id="progressBar"/>
					<div className="elapsedTime">{this.props.currentTime}</div>
				</div>
			);
		}
	}
}

function mapStateToProps(state) {
	return {
		track: state.playing,
		currentTime: state.currentTime
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({sendCurrentTime: currentTime}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Display);