import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {play} from '../actions/index';

class TrackList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			duration: []
		}
	}
	setDuration(duration, ID) {
		let durationObj = {
			duration: duration,
			ID: ID
		}
		var newDurationArr = this.state.duration;
		newDurationArr.push(durationObj);
		this.setState({duration: newDurationArr});
	}

	getDuration() {
		for (var i = 0; i < this.state.duration.length; i++) {
			let minutes = Math.floor(this.state.duration[i].duration / 60);
			let seconds = Math.floor(this.state.duration[i].duration - 60 * minutes);
			seconds = seconds.toString();
			if (seconds.length === 1) {
				seconds = '0' + seconds;
			}
			let resultTime = minutes + ":" + seconds;
			document.getElementById("dur" + this.state.duration[i].ID).textContent = resultTime;
		}
	}

	showList() {
		return this.props.tracks.map ((item) => {
			return (
				<li key={item.id} id={item.id} onClick={() => {
					this.props.play(item);
					let cells = document.getElementsByClassName('trackListCell');
					for (var i = 0; i < cells.length; i++) {
						cells[i].classList.toggle('playingTrack', false);
					}
					let cellForPlayingTrack = document.getElementById(item.id);
					cellForPlayingTrack.classList.add('playingTrack');
				}} className="trackListCell">
					<audio id={"for_duration" + item.id} src={item.source} preload="metadata" onLoadedData={() => {
						let thisAudio = document.getElementById('for_duration' + item.id);
						thisAudio.remove();
						this.setDuration(thisAudio.duration, item.id);
					}}/>
					<div className="track-info">{item.artist} - {item.name}</div><div id={"dur" + item.id} className="duration">{this.getDuration()}</div>
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
	return bindActionCreators({
		play: play
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TrackList);