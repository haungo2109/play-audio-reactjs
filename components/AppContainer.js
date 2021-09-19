import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import ReactPlayer from 'react-player';

class AppContainer extends Component {
	state = {
		url: 'https://soundcloud.com/h-u-ng-705938401/202110919-073750-thong-bao',
		pip: false,
		playing: true,
		controls: false,
		light: false,
		volume: 0.8,
		muted: false,
		played: 0,
		loaded: 0,
		duration: 0,
		playbackRate: 1.0,
		loop: false,
		durationLoop: 3,
		intervalId: 0,
	};

	componentDidMount() {
		console.log('conponent render');

		const newIntervalId = setInterval(() => {
			if (this.state.loop) {
				this.setState({ playing: true });
			}
		}, 1000 * 60 * parseInt(this.state.durationLoop));

		this.setState({ intervalId: newIntervalId });
	}
	componentWillUnmount() {
		clearInterval(this.state.intervalId);
	}

	load = (url) => {
		this.setState({
			url,
			played: 0,
			loaded: 0,
			pip: false,
		});
	};

	handlePlayPause = () => {
		this.setState({ playing: !this.state.playing });
	};

	handleStop = () => {
		this.setState({ url: null, playing: false });
	};

	handleToggleControls = () => {
		const url = this.state.url;
		this.setState(
			{
				controls: !this.state.controls,
				url: null,
			},
			() => this.load(url)
		);
	};

	handleToggleLight = () => {
		this.setState({ light: !this.state.light });
	};

	handleToggleLoop = () => {
		this.setState({ loop: !this.state.loop });
	};
	handleDurationLoop = (e) => {
		if (e.target.value !== '')
			this.setState({ durationLoop: parseInt(e.target.value) });
		else this.setState({ durationLoop: 0 });
	};

	handleVolumeChange = (e) => {
		this.setState({ volume: parseFloat(e.target.value) });
	};

	handleToggleMuted = () => {
		this.setState({ muted: !this.state.muted });
	};

	handleSetPlaybackRate = (e) => {
		this.setState({ playbackRate: parseFloat(e.target.value) });
	};

	handleTogglePIP = () => {
		this.setState({ pip: !this.state.pip });
	};

	handlePlay = () => {
		console.log('onPlay');
		this.setState({ playing: true });
	};

	handleEnablePIP = () => {
		this.setState({ pip: true });
	};

	handleDisablePIP = () => {
		console.log('onDisablePIP');
		this.setState({ pip: false });
	};

	handlePause = () => {
		console.log('onPause');
		this.setState({ playing: false });
	};

	handleSeekMouseDown = (e) => {
		this.setState({ seeking: true });
	};

	handleSeekChange = (e) => {
		this.setState({ played: parseFloat(e.target.value) });
	};

	handleSeekMouseUp = (e) => {
		this.setState({ seeking: false });
		this.player.seekTo(parseFloat(e.target.value));
	};

	handleProgress = (state) => {
		if (!this.state.seeking) {
			this.setState(state);
		}
	};

	handleEnded = () => {
		console.log('onEnded');
		this.setState({ playing: this.state.loop });
	};

	handleDuration = (duration) => {
		console.log('onDuration', duration);
		this.setState({ duration });
	};

	renderLoadButton = (url, label) => {
		return <button onClick={() => this.load(url)}>{label}</button>;
	};

	ref = (player) => {
		this.player = player;
	};

	render() {
		const {
			url,
			playing,
			controls,
			light,
			volume,
			muted,
			loop,
			played,
			loaded,
			duration,
			playbackRate,
			pip,
			durationLoop,
		} = this.state;
		const SEPARATOR = ' · ';

		return (
			<div className="app">
				<section className="section">
					<div className="player-wrapper">
						<ReactPlayer
							ref={this.ref}
							className="react-player"
							width="100%"
							height="100%"
							url={url}
							pip={pip}
							playing={playing}
							controls={controls}
							light={light}
							loop={loop}
							playbackRate={playbackRate}
							volume={volume}
							muted={muted}
							onReady={() => console.log('onReady')}
							onStart={() => console.log('onStart')}
							onPlay={this.handlePlay}
							onEnablePIP={this.handleEnablePIP}
							onDisablePIP={this.handleDisablePIP}
							onPause={this.handlePause}
							onBuffer={() => console.log('onBuffer')}
							onSeek={(e) => console.log('onSeek', e)}
							onEnded={this.handleEnded}
							onError={(e) => console.log('onError', e)}
							onProgress={this.handleProgress}
							onDuration={this.handleDuration}
						/>
					</div>

					<table>
						<tbody>
							<tr>
								<th>Điều khiển</th>
								<td>
									<button onClick={this.handleStop}>
										Dừng lại
									</button>
									<button onClick={this.handlePlayPause}>
										{playing ? 'Tạm dừng' : 'Phát'}
									</button>
									{light && (
										<button
											onClick={() =>
												this.player.showPreview()
											}
										>
											Hiển thị xem trước
										</button>
									)}
									{ReactPlayer.canEnablePIP(url) && (
										<button onClick={this.handleTogglePIP}>
											{pip ? 'Disable PiP' : 'Enable PiP'}
										</button>
									)}
								</td>
							</tr>
							<tr>
								<th>Tốc độ phát</th>
								<td>
									<button
										onClick={this.handleSetPlaybackRate}
										value={1}
									>
										1x
									</button>
									<button
										onClick={this.handleSetPlaybackRate}
										value={1.5}
									>
										1.5x
									</button>
									<button
										onClick={this.handleSetPlaybackRate}
										value={2}
									>
										2x
									</button>
								</td>
							</tr>
							<tr>
								<th>Thời lượng phát</th>
								<td>
									<input
										type="range"
										min={0}
										max={0.999999}
										step="any"
										value={played}
										onMouseDown={this.handleSeekMouseDown}
										onChange={this.handleSeekChange}
										onMouseUp={this.handleSeekMouseUp}
									/>
								</td>
							</tr>
							<tr>
								<th>Âm lượng</th>
								<td>
									<input
										type="range"
										min={0}
										max={1}
										step="any"
										value={volume}
										onChange={this.handleVolumeChange}
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="controls">Controls</label>
								</th>
								<td>
									<input
										id="controls"
										type="checkbox"
										checked={controls}
										onChange={this.handleToggleControls}
									/>
									<em>&nbsp; Requires player reload</em>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="muted">Tắt tiếng</label>
								</th>
								<td>
									<input
										id="muted"
										type="checkbox"
										checked={muted}
										onChange={this.handleToggleMuted}
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="loop">Cho phép lặp</label>
								</th>
								<td>
									<input
										id="loop"
										type="checkbox"
										checked={loop}
										onChange={this.handleToggleLoop}
									/>
								</td>
							</tr>
							<tr>
								<th>
									<label htmlFor="loop">
										Thời gian cách 2 lần lặp
									</label>
								</th>
								<td>
									<input
										id="durationLoop"
										type="number"
										value={durationLoop}
										onChange={this.handleDurationLoop}
									/>
								</td>
							</tr>
							<tr>
								<th>Played</th>
								<td>
									<progress max={1} value={played} />
								</td>
							</tr>
						</tbody>
					</table>
				</section>
				<section className="section">
					<table>
						<tbody>
							<tr>
								<th>Custom URL</th>
								<td>
									<input
										ref={(input) => {
											this.urlInput = input;
										}}
										type="text"
										placeholder="Enter URL"
									/>
									<button
										onClick={() =>
											this.setState({
												url: this.urlInput.value,
											})
										}
									>
										Load
									</button>
								</td>
							</tr>
						</tbody>
					</table>
				</section>
			</div>
		);
	}
}

export default hot(module)(AppContainer);
