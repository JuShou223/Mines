import React, { Component } from 'react';
import images from '../../assets/image/index'
import './play.styl'
import { Link } from 'react-router-dom'
import { createGameBoard } from '../../creatGameBoard/createGameBoard'
import PopUp from '../../common/popup/PopUp'
class PALY extends Component {
	state = {
		state_gameBoard: null,
		timePause: false,
	}
	componentWillUnmount = () => {
		const { gameBoard } = this.props
		if (gameBoard) {
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
			state_gameBoard: gameBoard
		})
		const { upadteGameHistory } = this.props;
		upadteGameHistory(gameBoard)
		this.startClock(gameBoard)
	}
	statusChanged = (action) => {
		const { setBgmAction } = this.props;
		setBgmAction({ type: action })
		const { state_gameBoard } = this.state;
		this.setState({
			state_gameBoard
		})
		if (action === 'GAMELOSE' || action === 'GAMESUCCESS') {
			const { upadteGameHistory, changeShowPopUp } = this.props;
			this.updateDiffiulties(state_gameBoard)
			upadteGameHistory(null)
			this.pauseClock()
			setTimeout(() => {
				changeShowPopUp(true)
			}, 1500);
		}
	}

	updateDiffiulties = (gameBoard) => {
		if (gameBoard.getLeftMine() === 0) {
			const { difficulties, difficulty } = this.props
			if (difficulties[difficulty].bestGrade > gameBoard.clock) {
				difficulties[difficulty].bestGrade = gameBoard.clock
			}
		}
	}

	startClock = (gameBoard) => {
		this.timeinterval = setInterval(() => {
			gameBoard.clock++;
			this.setState({
				state_gameBoard: gameBoard
			})
		}, 1000);
	}

	pauseClock = () => {
		clearInterval(this.timeinterval);
	}
	renderPopUp = (showPopUp) => {
		if (showPopUp) {
			const { state_gameBoard } = this.state
			const { changeShowPopUp, difficulty, difficulties } = this.props
			return (
				<PopUp type="gameover" difficulties={difficulties} difficulty={difficulty} changeShowPopUp={changeShowPopUp} replay={this.replay} clock={state_gameBoard.clock} leftMines={state_gameBoard.getLeftMine()} leftFlag={state_gameBoard.getLeftFlag()}></PopUp>
			)
		}
	}
	render() {
		const { state_gameBoard } = this.state
		const { showPopUp, setBgmAction } = this.props;
		const windowWidth = window.innerWidth > 500 ? 375 : window.innerWidth
		const gridwidth = (windowWidth / (state_gameBoard.minefield[0].length + 1))
		return (
			<div className="play_container" style={{ backgroundImage: `url(${images.normal.backgroundIMG})` }}>
				<div className="header">
					<Link to="/home">
						<img className="home_btn" src={images.normal.home} alt="" onClick={() => {
							setBgmAction({ type: 'CLICK' })
						}} />
					</Link>
					<div className="counter time">
						<img className="icon" src={images.normal.clock} alt="" />
						<div className="show_time clock">
							{state_gameBoard.clock}
						</div>
						<img className="icon" src={images.normal.flag} alt="" />
						<div className="show_time flag">
							{state_gameBoard.getLeftFlag()}
						</div>
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
														if(window.innerWidth < 500)
														state_gameBoard.onTouchStart(x, y) 
													}}
													onTouchEnd={() => { 
														if(window.innerWidth < 500)
														state_gameBoard.onTouchEnd(x, y) 
													}}
													onMouseDown={() => { 
														if(window.innerWidth >= 500)
														state_gameBoard.onTouchStart(x, y) 
													}}
													onMouseUp={() => { 
														if(window.innerWidth >= 500)
														state_gameBoard.onTouchEnd(x, y) 
													}}
												>
													<img src={images.normal.mine} alt="" className="mine" style={{ display: (e1.type === 'mine' && e1.status === 'show') ? 'block' : 'none' }} />
													<img src={images.normal.question} className="mine" style={{ display: e1.tag === 'uncertain' ? 'inline-block' : 'none' }} alt="" />
													<img src={images.normal.flag} className="mine" style={{ display: e1.tag === 'flag' ? 'inline-block' : 'none' }} alt="" />
													<img src={images.normal.error} alt="" className="mine" style={{ display: (e1.type !== 'mine' && e1.status === 'show' && e1.tag === 'flag') ? 'block' : 'none' }} />
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
				{
					this.renderPopUp(showPopUp)
				}
			</div>
		);
	}
}

export default PALY;