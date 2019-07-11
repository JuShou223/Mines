import React, { Component } from 'react';
import './popup.styl'
class PopUp extends Component {
	state = {}
	render() {
		return (
			<div className="popup_container mask1">
				<div className="popUp">
					<div className="header">
						挑战失败
          </div>
					<div className="middle">
						<div className="content">
							<span className="name">当前难度</span>:
            </div>
						<div className="content">
							<span className="name">用时</span>:
						</div>
						<div className="content">
							<span className="name">剩余地雷</span>:
						</div>
						<div className="content">
							<span className="name">最佳纪录</span>:
						</div>
					</div>
					<div className="bottom">
						<div className="btn2 fl">
							<span className="text">返回主页</span>
						</div>
						<div className="btn2 fr">
							<span className="text">返回主页</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default PopUp;
