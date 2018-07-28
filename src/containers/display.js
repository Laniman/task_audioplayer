import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {currentTime, playAnotherTrack} from '../actions/index';

class Display extends Component {
	updateTime() {
		var thisAudio = this.refs.audioPlayer;
		this.props.sendCurrentTime(thisAudio);
		var pBar = this.refs.progressBar;
		pBar.value = Math.floor(thisAudio.currentTime / thisAudio.duration * 1000);
	}

	swapClassesForPlayButton(classForRemove, classForAdd) {
		let playButton = document.getElementsByClassName(classForRemove);
		if (playButton[0]) {
			playButton[0].classList.add(classForAdd);
			playButton[0].classList.remove(classForRemove);
		}
	}

	swapClassesForPauseButton() {
		if (document.getElementsByClassName('pause').length > 0) {
			let pauseButton = document.getElementsByClassName('pause');
			pauseButton[0].classList.add('play');
			pauseButton[0].classList.remove('pause');
			let audioTrack = this.refs.audioPlayer;
			audioTrack.pause();
		}
		else {
			let playButton = document.getElementsByClassName('play');
			playButton[0].classList.add('pause');
			playButton[0].classList.remove('play');
			let audioTrack = this.refs.audioPlayer;
			audioTrack.play();
		}
	}

	forChangeVolumeBar() {
		let vBar = this.refs.volumeBar;
		let thisAudio = this.refs.audioPlayer;
		thisAudio.volume = vBar.value / 100;
	}

	forChangeProgressBar() {
		let thisAudio = this.refs.audioPlayer;
		let newCurrentTime = this.refs.progressBar.value * thisAudio.duration / 1000;
		thisAudio.currentTime = newCurrentTime;
		this.props.sendCurrentTime(thisAudio);
	}

	render() {
		if (!this.props.track) {
			return (
				<div className="display">
					<audio id="audioPlayer" 
						src=""/>
					<div className="previous"></div>
					<div className="play"></div>
					<div className="next"></div>
					<input type="range" 
						min="1" 
						max="100" 
						defaultValue="100" 
						className="volumeBar" 
						id="volumeBar"/>
					<input type="range" 
						min="1" 
						max="1000" 
						defaultValue="0" 
						className="progressBar" 
						id="progressBar"/>
					<span className="volume-text">Volume:</span>
					<div className="elapsedTime">0:00</div>
				</div>
			);
		}
		else {
			return (
				<div className="display">
					<audio id="audioPlayer" 
						src={this.props.track.source} 
						ref="audioPlayer"
						onTimeUpdate={() => this.updateTime()} 
						autoPlay="autoplay" 
						onPlaying={() => this.swapClassesForPlayButton('play', 'pause')} 
						onPause={() => this.swapClassesForPlayButton('pause', 'play')} 
						onEnded={() => this.props.playAnotherTrack('next')}/>
					<div className="previous" 
						onClick={() => this.props.playAnotherTrack('previous')}></div>
					<div className="pause" 
						onClick={() => this.swapClassesForPauseButton()}></div>
					<div className="next" 
						onClick={() => this.props.playAnotherTrack('next')}></div>
					<input type="range" 
						min="1" 
						max="100" 
						defaultValue="100" 
						className="volumeBar" 
						id="volumeBar" 
						ref="volumeBar"
						onChange={() => this.forChangeVolumeBar()}/>
					<input type="range" 
						min="1" 
						max="1000" 
						defaultValue="0" 
						className="progressBar" 
						id="progressBar" 
						ref="progressBar"
						onChange={() => this.forChangeProgressBar()}/>
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