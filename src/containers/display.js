import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {currentTime, playAnotherTrack} from '../actions/index';

class Display extends Component {
	render() {
		if (!this.props.track) {
			return (
				<div className="display">
					<audio id="audioPlayer" src=""/>
					<div className="previous"></div>
					<div className="play"></div>
					<div className="next"></div>
					<input type="range" min="1" max="100" defaultValue="100" className="volumeBar" id="volumeBar"/>
					<input type="range" min="1" max="1000" defaultValue="0" className="progressBar" id="progressBar"/>
					<span className="volume-text">Volume:</span>
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
						pBar.value = Math.floor(thisAudio.currentTime / thisAudio.duration * 1000);
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
					}} onEnded={() => this.props.playAnotherTrack('next')}/>
					<div className="previous" onClick={() => {
						this.props.playAnotherTrack('previous');
					}}></div>
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
					<div className="next" onClick={() => {
						this.props.playAnotherTrack('next');
					}}></div>
					<input type="range" min="1" max="100" defaultValue="100" className="volumeBar" id="volumeBar" onChange={() => {
						let vBar = document.getElementById('volumeBar');
						let thisAudio = document.getElementById('audioPlayer');
						thisAudio.volume = vBar.value / 100;
					}}/>
					<input type="range" min="1" max="1000" defaultValue="0" className="progressBar" id="progressBar" onChange={() => {
						let thisAudio = document.getElementById('audioPlayer');
						let newCurrentTime = document.getElementById('progressBar').value * thisAudio.duration / 1000;
						thisAudio.currentTime = newCurrentTime;
						this.props.sendCurrentTime(thisAudio);
					}}/>
					<span className="volume-text">Volume:</span>
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
	return bindActionCreators({
		sendCurrentTime: currentTime,
		playAnotherTrack: playAnotherTrack
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Display);