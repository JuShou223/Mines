import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { CSSTransition } from "react-transition-group";
import './popup.styl'

class PopUp extends Component {
	state = {
		showPopUp: false
	}
	componentWillReceiveProps() {
		const { showPopUp } = this.props;
		this.setState({
			showPopUp
		})
	}
	shouldComponentUpdate(nextstate) {
		if (nextstate.showPopUp === this.state.showPopUp) {
			return false
		} else {
			this.setState({
				showPopUp: nextstate.showPopUp
			})
			if (nextstate.leftMines === 0 && nextstate.clock < nextstate.difficulties[nextstate.difficulty].bestGrade) {
				nextstate.difficulties[nextstate.difficulty].bestGrade = nextstate.clock;
			}
			return true
		}
	}
	render() {
		const { leftMines, difficulty, difficulties, clock, replay, type, openNewGame, hidePopUp } = this.props
		const { showPopUp } = this.state;
		return (
			<CSSTransition in={showPopUp} timeout={300} classNames="translate">
				<div className="popup_container" style={{ display: showPopUp ? 'block' : 'none' }}>
					<div className="mask"></div>
					<div className="popUp" style={{ display: type === 'gameover' ? 'block' : 'none' }}>
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
								<span className="value">{Math.floor(clock / 60) + '‘  ' + clock % 60 + '’’'}</span>
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
								<div className="btn2 fl">
									<span className="text">返回主页</span>
								</div>
							</Link>
							<div className="btn2 fr" onClick={
								() => {
									replay()
								}
							}>
								<span className="text">重新开始</span>
							</div>
						</div>
					</div>
					<div className="popUp" style={{ display: type === 'check' ? 'block' : 'none' }}>
						<div className="warning">
							当前有游戏未完成，确定重新开始游戏?
						</div>
						<div className="bottom">
							<div className="btn2 fl" onClick={() => {
								openNewGame()
							}} >
								<span className="text">确定</span>
							</div>
							<div className="btn2 fr" onClick={
								() => {
									hidePopUp()
								}
							}>
								<span className="text">取消</span>
							</div>
						</div>
					</div>
				</div>
			</CSSTransition>
		);
	}
}

export default PopUp;
