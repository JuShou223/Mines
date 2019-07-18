import React, { Component } from 'react';
import Audio from '../../container/Audio'
import './play.styl'
import mine4 from '../../assets/image/mine4.png'
import flag from '../../assets/image/flag3.png'
import question from '../../assets/image/question.png'
import error from '../../assets/image/error.png'
import pause from '../../assets/image/pause.png'
import home from '../../assets/image/home.png'
import { Link } from 'react-router-dom'
import start from '../../assets/image/start.png'
import { createGameBoard } from '../../creatGameBoard/createGameBoard'
import PopUp from '../../container/PopUp'
class PALY extends Component {
	state = {
		state_gameBoard: null,
		timePause: false,
		showPopUp: false
	}
	componentWillUnmount = () => {
		const { gameBoard } = this.props
		if(gameBoard){
			const { upadteGameHistory } = this.props;
			const { state_gameBoard } = this.state;
			state_gameBoard.clearListener();
			this.pauseClock();
			upadteGameHistory(state_gameBoard)
		}
	}
	componentWillMount = () => {
		const { gameBoard } = this.props
		if (gameBoard) {
			gameBoard.subscribe((action) => { this.statusChanged(action) })
			this.setState({
				state_gameBoard: gameBoard,
			})
			this.setState({
				state_gameBoard: gameBoard,
			})
			this.startClock(gameBoard)
		} else {
			this.replay()
		}
	}

	replay = () => {
		const { difficulty } = this.props
		const gameBoard = createGameBoard(difficulty)
		gameBoard.subscribe((action) => { this.statusChanged(action) })
		this.setState({
			state_gameBoard: gameBoard,
			showPopUp: false
		})
		const { upadteGameHistory } = this.props;
		upadteGameHistory(gameBoard)
		this.startClock(gameBoard)
	}
	statusChanged = (action) => {
		const {setGameStatus} = this.props;
		setGameStatus({type:action})
		const { state_gameBoard } = this.state;
		this.setState({
			state_gameBoard
		})
		if (action === 'GAMELOSE' || action === 'GAMESUCCESS') {
			const { upadteGameHistory } = this.props;
			upadteGameHistory(null)
			this.pauseClock()
			setTimeout(() => {
				this.setState({
					showPopUp: true
				})
			}, 1500);
		}
	}


	startClock = (gameBoard) => {
		this.timeinterval = setInterval(() => {
			gameBoard.clock++;;
			this.setState({
				state_gameBoard: gameBoard
			})
		}, 1000);
	}

	pauseClock = () => {
		clearInterval(this.timeinterval);
	}


	render() {
		const { state_gameBoard, timePause, showPopUp} = this.state
		const windowWidth = window.innerWidth;
		const gridwidth = (windowWidth / (state_gameBoard.minefield[0].length + 1))
		return (
			<div className="play_container">
				<div className="header">
					<Link to="/home">
						<img className="home_btn" src={home} alt="" />
					</Link>
					<div className="counter time">
						<div className="show_time">
							{state_gameBoard.clock}
						</div>
						<img className="icon" src={timePause ? start : pause} alt="" onClick={() => {
							if (!timePause) {
								this.pauseClock()
							} else {
								this.startClock()
							}
							this.setState({
								timePause: !timePause
							})
						}} />
					</div>
				</div>
				<div className="map">
					<div className="mask"></div>
					{
						state_gameBoard.minefield.map((e, index) => {
							return (
								<div key={index} className="row">
									{
										e.map((e1, index) => {
											let { x, y } = e1;
											return (
												<div key={index} style={{ width: gridwidth, height: gridwidth }} className={`grid ${e1.status === 'show' ? 'open' : ''}`}
													onTouchStart={() => {
														state_gameBoard.onTouchStart(x, y)
													}}
													onTouchEnd={() => {
														state_gameBoard.onTouchEnd(x, y)
													}}
												>
													<img src={mine4} alt="" className="mine" style={{ display: (e1.type === 'mine' && e1.status === 'show') ? 'block' : 'none' }} />
													<img src={question} className="mine" style={{ display: e1.tag === 'uncertain' ? 'inline-block' : 'none' }} alt="" />
													<img src={flag} className="mine" style={{ display: e1.tag === 'flag' ? 'inline-block' : 'none' }} alt="" />
													<img src={error} className="mine" style={{ display: (e1.type !== 'mine' && e1.status === 'show' && e1.tag === 'flag') ? 'block' : 'none' }} />
													<span className="number" style={{ display: (e1.type === "number" && e1.status === 'show') ? 'inline-block' : 'none', lineHeight: gridwidth + 'px' }}>{e1.value}</span>
												</div>
											)
										})
									}
								</div>
							)
						})
					}
				</div>
				<Audio></Audio>
				<PopUp type="gameover" showPopUp={showPopUp} replay={this.replay} clock={state_gameBoard.clock} leftMines={state_gameBoard.getLeftMine()} leftFlag={state_gameBoard.getLeftFlag()}></PopUp>
			</div>
		);
	}
}

export default PALY;