import React, { Component } from 'react';
import './play.styl'
import pause from '../../assets/pause.png'
import home from '../../assets/home.png'
import { Link } from 'react-router-dom'
import mine3 from '../../assets/mine3.png'
import flag from '../../assets/flag.png'
import question from '../../assets/question.png'
import { createGrid } from '../../model/grid'
import { onDoubleTouch } from '../../common/plugin'
import start from '../../assets/start.png'
class PALY extends Component {
	state = {
		time: {
			hour: 0,
			minute: 0,
			second: 0
		},
		timePause: false,
		mapstate: []
	}
	componentWillUnmount = () => {
		clearInterval(this.timecounter)
	}
	componentDidMount = () => {
		this.singal = false;
		this.nullArray = [];
		this.dbclicktime = 0;
		const { updateMap } = this.props
		const { map, difficulty } = this.props;
		if (map.length === 0) {
			let newmap = this.createMap(difficulty)
			this.setState({
				mapstate: newmap
			})
			updateMap(newmap)
		} else {
			this.setState({
				mapstate: map
			})
		}
		this.setTime()
	}
	createMap = (difficulty) => {
		const { mines, size, } = difficulty;
		const { x, y } = size
		let minesCoordinates = this.getMinesCoordinates(mines, x, y);
		let map = this.createMapByMines(minesCoordinates, x, y);
		return map;
	}
	getMinesCoordinates = (mynum, x, y) => {
		var RandomArr = [];
		var RandomTotal = 0;
		function createRandom(num) {
			if (RandomArr.length === 0) {
				RandomTotal = num;
			}
			for (var i = 0; i < num; i++) {
				var code = Math.round(Math.random() * (x * y - 1));
				if (!RandomArr.includes(code)) {
					RandomArr.push(code);
				}
			}
			var cha = RandomTotal - RandomArr.length;
			if (cha <= 0) {
				return RandomArr
			} else {
				return createRandom(cha)
			}
		}
		return createRandom(mynum);
	}
	createMapByMines = (mines, x, y) => {
		let map = [];
		for (let i = 0; i < x; i++) {
			let row = []
			for (let j = 0; j < y; j++) {
				let minenum = 0;
				if (mines.includes(i * y + j)) {
					let grid = createGrid("close", i, j, "mine", minenum, true)
					row.push(grid)
				} else {
					for (let k = 0; k < 9; k++) {
						let newi = i - 1 + Math.floor(k / 3);
						let newj = j - 1 + k % 3;
						if (newi >= 0 && newi < x && newj >= 0 && newj < y) {
							if (newi !== i || newj !== j) {
								if (mines.includes(newi * y + newj)) {
									minenum++;
								}
							}
						}
					}
					if (minenum > 0) {
						let grid = createGrid("close", i, j, "number", minenum, true)
						row.push(grid)
					} else {
						let grid = createGrid("close", i, j, "null", minenum, true)
						row.push(grid)
					}
				}
			}
			map.push(row)
		}
		return map
	}
	setTime = () => {
		const { time } = this.state
		this.timecounter = setInterval(() => {
			time.second++;
			if (time.second === 60) {
				time.minute++;
				time.second = 0;
			}
			if (time.minute === 60) {
				time.hour++;
				time.minute = 0;
			}
			this.setState({
				time
			})
		}, 1000);
	}
	addzero(data) {
		if (data < 10) {
			return `0${data}`
		} else {
			return data
		}
	}
	gameOver = (status) => {
		switch(status){
			case 'fail':
				this.gameFail();
				return;
			case 'success':
				this.gameSuccess();
				return;
			default:
				return;
		}
	}
	gameFail=()=>{

	}
	gameSuccess=()=>{

	}
	handleOpenOne = (e1, map) => {
		if ((e1.status === 'question' || e1.status === 'close') && e1.clickable) {
			e1.status = 'open';
			switch (e1.type) {
				case 'null':
					e1.clickable = false;
					this.nullArray.push(e1);
					break;
				case 'mine':
					this.gameOver('fail');
					return;
				default:
					break;
			}
		}
		if (e1.type !== 'null')
			e1.clickable = true
		this.setState({
			mapstate: map
		})
	}
	handleChangeStatus = (e1, map) => {
		switch (e1.status) {
			case 'close':
				e1.status = 'flag'
				break;
			case 'flag':
				e1.status = 'question';
				e1.clickable = false;
				break;
			case 'question':
				e1.status = 'close';
				e1.clickable = false;
				break;
			default:
				break;
		}
		this.setState({
			mapstate: map
		})
	}
	// mapround = (i, j) => {
	// 	const { difficulty } = this.props;
	// 	const { size, } = difficulty;
	// 	const { x, y } = size;
	// 	for (let k = 0; k < 9; k++) {
	// 		let newi = i - 1 + Math.floor(k / 3);
	// 		let newj = j - 1 + k % 3;
	// 		if (newi >= 0 && newi < x && newj >= 0 && newj < y) {
	// 			if (newi != i || newj != j) {
	// 				return {
	// 					i,
	// 					j
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	checkFlag = (e1, map) => {
		const { difficulty } = this.props;
		const { size, } = difficulty;
		const { x, y } = size;
		let flagnum = 0;
		for (let k = 0; k < 9; k++) {
			let newi = e1.x - 1 + Math.floor(k / 3);
			let newj = e1.y - 1 + k % 3;
			if (newi >= 0 && newi < x && newj >= 0 && newj < y) {
				if (newi != e1.x || newj != e1.y) {
					if (map[newi][newj].status === 'flag') {
						flagnum++
					}
				}
			}
		}
		return e1.value === flagnum ? true : false;
	}
	handleOpenRound = (e1, map) => {
		if (e1.x === this.curTarget.x && this.curTarget.y === e1.y && this.curTarget.status === 'open') {
			const { difficulty } = this.props;
			const { size, } = difficulty;
			const { x, y } = size;
			for (let k = 0; k < 9; k++) {
				let newi = e1.x - 1 + Math.floor(k / 3);
				let newj = e1.y - 1 + k % 3;
				if (newi >= 0 && newi < x && newj >= 0 && newj < y) {
					if (newi != e1.x || newj != e1.y) {
						this.handleOpenOne(map[newi][newj], map)
					}
				}
			}
			while (this.nullArray.length > 0) {
				this.curTarget = this.nullArray.shift();
				this.handleOpenRound(this.curTarget, map)
			}
		}
	}
	renderMap = (map) => {
		return (
			<div className="map_container">
				{
					map.map((e, index) => {
						return (
							<div key={index} className="row">
								{
									e.map((e1, index) => {
										return (
											<div key={index} className={`grid ${e1.status === 'open' ? 'open' : ''}`}
												onTouchStart={() => {
													console.log(e1)
													// 当长按超过0.5秒就改变格子的状态
													this.timeout = setTimeout(() => {
														this.handleChangeStatus(e1, map)
													}, 500);
													if (this.checkFlag(e1, map)) {
														onDoubleTouch(() => { this.handleOpenRound(e1, map) }).bind(this)()
													}
													this.curTarget = e1;
												}}
												onTouchEnd={() => {
													clearTimeout(this.timeout)
													if (e1.type !== "null") {
														this.handleOpenOne(e1, map)
													} else {
														if (e1.clickable) {
															this.handleOpenOne(e1, map)
															this.handleOpenRound(this.nullArray.shift(), map)
														}
													}
												}}
											>
												<img src={question} className="mine" style={{ display: e1.status === 'question' ? 'inline-block' : 'none' }} alt="" />
												<img src={flag} className="mine" style={{ display: e1.status === 'flag' ? 'inline-block' : 'none' }} alt="" />
												<img src={mine3} alt="" className="mine" style={{ display: (e1.type === 'mine' && e1.status === 'open') ? 'block' : 'none' }} />
												<span style={{ display: (e1.type === "number" && e1.status === 'open') ? 'inline-block' : 'none' }}>{e1.value}</span>
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		)
	}
	handlePause=(timePause)=>{
		timePause = !timePause;
		if(timePause){
			clearInterval(this.timecounter)
		}else{
			console.log('aa')
			this.setTime()
		}
		this.setState({
			timePause
		})
	}
	render() {
		const { time, mapstate, timePause } = this.state
		const { hour, minute, second } = time;
		return (
			<div className="play_container">
				<div className="header">
					<Link to="/home">
						<img className="home_btn" src={home} alt="" />
					</Link>
					<div className="counter time">
						<div className="show_time">
							<span>{this.addzero(hour)} : </span>
							<span>{this.addzero(minute)} : </span>
							<span>{this.addzero(second)}</span>
						</div>
						<img className="icon" src={timePause ? start : pause} alt="" onClick={() => {
							this.handlePause(timePause)
						}} />
					</div>
				</div>
				<div className="map">
					{this.renderMap(mapstate)}
				</div>
			</div>
		);
	}
}

export default PALY;