import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {play, playAnotherTrack} from '../actions/index';

class TrackList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			duration: [],
			playingTrackInfo: {
				id: '-1',
				mode: ''
			}
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

	filterList() {
		let searchInput = document.getElementById('searchTracks');
		if (searchInput != null) {
			let filter = searchInput.value.toUpperCase();
			if (searchInput.value.length > 2) {
				let cells = document.getElementsByClassName('trackListCell');
				for (var i = 0; i < cells.length; i++) {
					let someSpan = cells[i].getElementsByTagName("span")[0];
			        if (someSpan.innerHTML.toUpperCase().indexOf(filter) > -1) {
			            cells[i].style.display = "";
			        } else {
			            cells[i].style.display = "none";
			        }
				}
			} else {
				let cells = document.getElementsByClassName('trackListCell');
				for (let i = 0; i < cells.length; i++) {
					cells[i].style.display = "";
				}
			}
		}
	}

	listItemClickHandle(item) {
		if (this.state.playingTrackInfo.id !== item.id){
			this.props.play(item);
			this.setState({playingTrackInfo: {
				id: item.id,
				mode: 'playing'
			}});
			let cells = document.getElementsByClassName('trackListCell');
			for (var i = 0; i < cells.length; i++) {
				cells[i].classList.remove('playingTrack');
			}
			let cellForPlayingTrack = document.getElementById(item.id);
			cellForPlayingTrack.classList.add('playingTrack');
		}
		else {
			if (this.state.playingTrackInfo.mode === 'playing') {
				document.getElementById('audioPlayer').pause();
				this.setState({playingTrackInfo: {
					id: item.id,
					mode: 'pause'
				}});
			}
			else {
				document.getElementById('audioPlayer').play();
				this.setState({playingTrackInfo: {
					id: item.id,
					mode: 'playing'
				}});
			}
		}
	}

	audioDataLoaded(item) {
		let thisAudio = document.getElementById('for_duration' + item.id);
		thisAudio.parentElement.removeChild(thisAudio);
		this.setDuration(thisAudio.duration, item.id);
	}

	showList() {
		if (this.props.playAnotherTrack != null) {
			var anotherTrack;
			if ((this.props.playAnotherTrack === 'NEXT') && (this.state.playingTrackInfo.id === this.props.tracks[this.props.tracks.length - 1].id)) {
				anotherTrack = this.props.tracks[0];
			}
			else if ((this.props.playAnotherTrack === 'PREVIOUS') && (this.state.playingTrackInfo.id === this.props.tracks[0].id)) {
				anotherTrack = this.props.tracks[this.props.tracks.length - 1];
			} else {
				for (var i = 0; i < this.props.tracks.length; i++) {
					if (this.props.tracks[i].id === this.state.playingTrackInfo.id) {
						if (this.props.playAnotherTrack === 'NEXT') {
							anotherTrack = this.props.tracks[i + 1];
						} else {
							anotherTrack = this.props.tracks[i - 1];
						}
					}
				}
			}
			this.props.anotherTrackToNull(null);
			this.props.play(anotherTrack);
			this.setState({playingTrackInfo: {
				id: anotherTrack.id,
				mode: 'playing'
			}});
			let cells = document.getElementsByClassName('trackListCell');
			for (let i = 0; i < cells.length; i++) {
				cells[i].classList.remove('playingTrack');
			}
			let cellForPlayingTrack = document.getElementById(anotherTrack.id);
			cellForPlayingTrack.classList.add('playingTrack');
		}
		return this.props.tracks.map ((item) => {
			return (
				<li key={item.id} 
					id={item.id} 
					onClick={() => this.listItemClickHandle(item)} 
					className="trackListCell">
					<audio id={"for_duration" + item.id} 
						src={item.source} 
						preload="metadata" 
						onLoadedData={() => this.audioDataLoaded(item)}/>
					<div className="track-info">
						<span>{item.artist} - {item.name}</span>
					</div>
					<div id={"dur" + item.id} className="duration">{this.getDuration()}</div>
				</li>
			);
		});
	}

	render() {
		return (
			<div className="tracklist">
				<input className="searchField" type="search" placeholder="Search for artists or tracks" id="searchTracks" onKeyUp={() => this.filterList()}/>
				<ol id="listOfTracks">
					{this.showList ()}
				</ol>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		tracks: state.tracks,
		playAnotherTrack: state.playAnotherTrack
	};
}

function matchDispatchToProps(dispatch) {
	return bindActionCreators({
		play: play,
		anotherTrackToNull: playAnotherTrack
	}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(TrackList);