import React, { Component } from 'react';
import './play.styl'
import pause from '../../assets/pause.png'
import home from '../../assets/home.png'
import { Link } from 'react-router-dom'
import mine3 from '../../assets/mine3.png'
import { createGrid } from '../../model/grid'
class PALY extends Component {
	state = {
		time: {
			hour: 0,
			minute: 0,
			second: 0
		}
	}
	componentWillUnmount=()=>{
		const {updateMap} = this.props;
		let map =[];
		updateMap(map)

	}
	componentDidMount = () => {
		const { map, difficulty } = this.props;
		console.log(difficulty)
		if (map.length === 0) {
			this.createMap(difficulty)
		}
		this.setTime()
	}
	createMap = (difficulty) => {
		const { updateMap } = this.props
		const { mines, size, } = difficulty;
		const { x, y } = size
		let minesCoordinates = this.getMinesCoordinates(mines, x, y);
		console.log(minesCoordinates)
		console.log(minesCoordinates.map(e=>{
			return{
			x:Math.floor(e/16),
			y:e%16
			}
		}))
		let map = this.createMapByMines(minesCoordinates, x, y);
		updateMap(map)
	}
	getMinesCoordinates = (mynum, x, y) => {
		var RandomArr = [];
		var RandomTotal = 0;
		function createRandom(num) {
			if (RandomArr.length == 0) {
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
					let grid = createGrid("close", i, j, "mine", minenum)
					row.push(grid)
				} else {
					for (let k = 0; k < 9; k++) {
						let newi = i - 1 + Math.floor(k / 3);
						let newj = j - 1 + k % 3;
						if (newi != i || newj != j) {
							if (mines.includes(newi * y + newj)) {
								minenum++;
							}
						}
					}
					if (minenum > 0) {
						let grid = createGrid("close", i, j, "number", minenum)
						row.push(grid)
					} else {
						let grid = createGrid("close", i, j, "null", minenum)
						row.push(grid)
					}
				}
			}
			map.push(row)
		}
		console.log(map)
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
	renderMap=()=>{
		const { map } = this.props;
		return(
			<>
				{
					map.map((e,index)=>{
						return (
							<div key={index} className="row">
								{
									e.map((e1,index)=>{
										return (
											<div key={index} className="grid">
												<div className={`content`}>
													<img src={mine3} alt="" className="mine" style={{display: e1.type==='mine' ? 'block' : 'none'}}/>
													<span style={{display: e1.type==="number" ? 'inline-block' : 'none'}}>{e1.value}</span>
												</div>
											</div>
										)
									})
								}
							</div>
						)
					})
				}
			</>
		)
	}
	render() {
		const { time } = this.state
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
						<img className="icon" src={pause} alt="" />
					</div>
				</div>
				<div className="map">
					{this.renderMap()}
				</div>
			</div>
		);
	}
}

export default PALY;