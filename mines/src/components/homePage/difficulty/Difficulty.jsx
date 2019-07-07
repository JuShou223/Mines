import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import './difficulty.styl'

class Difficulty extends Component {
	state = {}
	render() {
		const { startCilentY, degree, showDiff} = this.props;
		const { getStartCilentY, toFix, calculateDegree, showDifficulty, setDiffByDegree} = this.props
		return (
			<CSSTransition in={showDiff} timeout={300} classNames="translate">
			<div className="difficulty" style={{display: showDiff ? 'block' : 'none'}}>
			<div className="container">
				<div className="mask"></div>
				<div className="contain">
					<div className="box" style={{ transform: `rotateX(${degree}deg)` }} onTouchStart={(e) => {
						getStartCilentY(e.touches[0].clientY)
					}} onTouchMove={(e) => {
						calculateDegree(startCilentY, e.touches[0].clientY, degree)
					}}
						onTouchEnd={() => {
							toFix(degree)
							setDiffByDegree(degree)
						}}
					>
						<div className="face one">
							<div className="level text">
								初级
                        </div>
							<div className="des text">
								<span>(💣10个|9x9)</span>
							</div>
						</div>
						<div className="face two">
							<div className="level text">
								中级
                        </div>
							<div className="des text">
								<span>(💣20个|12*9)</span>
							</div>
						</div>
						<div className="face three">
							<div className="level text">
								中国乒乓球级
                        </div>
							<div className="des text">
								<span>(💣188个|30*16)</span>
							</div>
						</div>
						<div className="face four">
							<div className="level text">
								地狱级
                        </div>
							<div className="des text">
								<span>(💣99个|30*16)</span>
							</div>
						</div>
						<div className="face five">
							<div className="level text">
								高级
                        </div>
							<div className="des text">
								<span>(💣30个|16*9)</span>
							</div>
						</div>
						<div className="face six">
							<div className="level text">
								顶级
                        </div>
							<div className="des text">
								<span>(💣50个|16*16)</span>
							</div>
						</div>
					</div>
				</div>
				<div className="mask up"></div>
				<div className="mask down"></div>
				<div className="side left"></div>
				<div className="side right"></div>
				<button className="btn close" onTouchEnd={()=>{
						setTimeout(() => {	
							showDifficulty(false)
						}, 400);
					}}>
					<span>确认</span>
				</button>
				{/* <button className="btn goup"></button> */}
				{/* <button className="btn godown"></button> */}
			</div>
			</div>
			</CSSTransition>
		);
	}
}

export default Difficulty;