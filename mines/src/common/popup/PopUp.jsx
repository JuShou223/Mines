import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import MButton from '../m_button/MButton'
import './popup.styl'

class PopUp extends Component {
	state = {
		time: 0
	}
	componentWillMount = () => {
		const { duration } = this.props
		if (duration > 0) {
			this.setState({
				time: duration / 1000
			})
		}
	}
	componentDidMount = () => {
		let { time } = this.state
		if (time) {
			this.interval = setInterval(() => {
				time--
				this.setState({
					time
				})
			}, 1000);
		}
	}
	renderGameOver = () => {
		const { leftMines, difficulty, difficulties, clock, replay, changeShowPopUp } = this.props
		return (
			<div className="popUp">
				<div className="title">
					{leftMines > 0 ? '挑战失败' : '挑战成功'}
				</div>
				<div className="middle">
					<div className="content">
						<span className="name">当前难度</span>:
								<span className="value">{difficulties[difficulty].name}</span>
					</div>
					<div className="content">
						<span className="name">用时</span>:
								<span className="value">{Math.floor(clock / 60) + '’  ' + clock % 60 + '’’'}</span>
					</div>
					<div className="content">
						<span className="name">剩余地雷</span>:
								<span className="value">{leftMines}</span>
					</div>
					<div className="content">
						<span className="name">最佳纪录</span>:
								<span className="value">{difficulties[difficulty].bestGrade < 9999999999999999999999 ? Math.floor(difficulties[difficulty].bestGrade / 60) + '‘  ' + difficulties[difficulty].bestGrade % 60 + '’’' : '暂无'}</span>
					</div>
				</div>
				<div className="bottom">
					<Link to='/home'>
						<MButton className="btn2 fl" onClick={() => { changeShowPopUp(false) }}>
							<span className="text">返回主页</span>
						</MButton>
					</Link>
					<MButton className="btn2 fr" onClick={
						() => {
							replay()
							changeShowPopUp(false)
						}
					}>
						<span className="text">重新开始</span>
					</MButton>
				</div>
			</div>
		)
	}

	renderCheck = () => {
		const { changeShowPopUp, openNewGame } = this.props
		return (
			<div className="popUp">
				<div className="warning">
					当前有游戏未完成，确定重新开始游戏?
						</div>
				<div className="bottom">
					<MButton className="btn2 fl" onClick={() => {
						openNewGame()
						changeShowPopUp(false)
					}} >
						<span className="text">确定</span>
					</MButton>
					<MButton className="btn2 fr" onClick={
						() => {
							changeShowPopUp(false)
						}
					}>
						<span className="text">取消</span>
					</MButton>
				</div>
			</div>
		)
	}
	renderTip = () => {
		const { changeShowPopUp } = this.props;
		const { time } = this.state
		if (time === 0) {
			clearInterval(this.interval)
			changeShowPopUp(false)
		}
		return (
			<div className="notPhone">
				<span className="sugesstion">为了更好的游戏体验，请调至移动端模式!</span>
				<span className="duration">-{time}s</span>
			</div>
		)
	}
	renderPopUp = (type) => {
		switch (type) {
			case 'gameover':
				return (this.renderGameOver())
			case 'check':
				return (this.renderCheck())
			case 'tip':
				return (this.renderTip())
			default:
				return;
		}
	}
	render() {
		const { type } = this.props;
		return (
			<div className="popup_container">
				<div className="mask"></div>
				{this.renderPopUp(type)}
			</div>
		);
	}
}

export default PopUp;
