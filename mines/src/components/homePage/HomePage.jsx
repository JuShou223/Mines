import React, { Component } from 'react';
import images from '../../assets/image/index'
import Difficulty from '../../common/difficulty/Difficulty'
import PopUp from '../../common/popup/PopUp'
import MButton from '../../common/m_button/MButton'
import GamePlay from './gamePlay/GamePlay'
import './homePage.styl'

class Home extends Component {
	state = {
		showbtn: false,
		showTip: false,
		type: '',
		duration: 0
	}
	hasOldGame = () => {
		const { gameBoard } = this.props
		if (gameBoard) {
			return true
		} else {
			return false
		}
	}
	openNewGame = () => {
		const { upadteGameHistory } = this.props;
		upadteGameHistory(null);
		this.props.history.push('/play')
	}
	openOldGame = () => {
		this.props.history.push('/play')
	}
	renderGamePlay = (showGamePlay) => {
		if (showGamePlay) {
			const { changShowGamePlay } = this.props
			return (
				<GamePlay changShowGamePlay={changShowGamePlay}></GamePlay>
			)
		}
	}
	renderDifficulty = (showDiff) => {
		if (showDiff) {
			const { difficulties, setDifficulty, showDifficulty, changeShowPopUp } = this.props
			return (
				<Difficulty showDiff={showDiff} hasOldGame={this.hasOldGame} changeShowPopUp={changeShowPopUp} difficulties={difficulties} setDifficulty={setDifficulty} showDifficulty={showDifficulty}></Difficulty>
			)
		}
	}
	renderPopUp = (showPopUp, type) => {
		if (showPopUp) {
			const { duration } = this.state
			const { changeShowPopUp } = this.props
			return (
				<PopUp duration={duration} type={type} openNewGame={this.openNewGame} changeShowPopUp={changeShowPopUp}></PopUp>
			)
		}
	}
	componentDidMount = () => {
		const { showTip, changeShowTip } = this.props
		if (showTip) {
			const width = window.innerWidth
			if (width > 800) {
				const { changeShowPopUp } = this.props
				this.setState({
					type: 'tip',
					duration: 5000
				})
				changeShowPopUp(true)
			}
			changeShowTip(false)
		}
		if (this.hasOldGame()) {
			this.setState({
				showbtn: true
			})
		}
	}
	render() {
		const { showDiff, showPopUp, showGamePlay } = this.props;
		const { showDifficulty, changShowGamePlay } = this.props;
		const { showbtn, type } = this.state;
		return (
			<div className='home_container' style={{ backgroundImage: `url(${images.normal.backgroundIMG})` }}>
				<div className="header">
					<img className="logo" src={images.normal.logo} alt="" />
					<div className="title text">扫雷</div>
				</div>
				<div className="home_content">
					<MButton className="btn" onClick={() => {
						this.openNewGame()
					}}>
						<span className="text" >新游戏</span>
					</MButton>
					<MButton className="btn" show={showbtn}
						onClick={() => {
							this.openOldGame()
						}}>
						<span className="text">继续游戏</span>
					</MButton>
					<MButton className="btn" onClick={() => {
						this.setState({
							type: 'check'
						})
						showDifficulty(true)
					}}>
						<span className="text">更换难度</span>
					</MButton>
					<MButton className="btn" onClick={() => {
						changShowGamePlay(true)
					}}>
						<span className="text">游戏玩法</span>
					</MButton>
				</div>
				<div className="bottom1">
					<img className="minepic" src={images.normal.bottomLogo} alt="" />
				</div>
				{this.renderGamePlay(showGamePlay)}
				{this.renderDifficulty(showDiff)}
				{this.renderPopUp(showPopUp, type)}
			</div>
		);
	}
}

export default Home;