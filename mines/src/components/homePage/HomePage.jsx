import React, { Component } from 'react';
import logo from '../../assets/image/logo.png'
import mine from '../../assets/image/mine3.png'
import Difficulty from '../../container/Difficulty'
import PopUp from '../../container/PopUp'
import './homePage.styl'

class Home extends Component {
    state = {
        showPopUp: false
    }
    setPopUp = () =>{
        console.log('123')
        const {gameBoard} = this.props
        if(gameBoard){
            this.setState({
                showPopUp: true
            })
        }      
    }
    hidePopUp = () =>　{
        this.setState({
            showPopUp: false
        })
    }
    openNewGame=()=>{
        const { upadteGameHistory } = this.props;
        upadteGameHistory(null);
        this.props.history.push('/play')
    }
    openOldGame = ()=>{
        this.props.history.push('/play')
    }
    render() {
        const {gameBoard} = this.props
        const {showDifficulty} = this.props;
        const {showPopUp} = this.state
        console.log(showPopUp)
        return (
            <div className='home_container'>
                <div className="header">
                    <img className="logo" src={logo} alt="" />
                    <div className="title text">扫雷</div>
                </div>
                <div className="content">
                    <button className="btn" onClick={()=>{this.openNewGame()}}>
                        <span className="text" >新游戏</span>
                    </button>
                    <button className="btn" style={{display: gameBoard ? 'block' : 'none'}}
                    onClick={()=>{this.openOldGame()}}>
                        <span className="text">继续游戏</span>
                    </button>
                    <button className="btn" onClick={()=>{
                        setTimeout(() => {
                        showDifficulty(true)                            
                        }, 400);
                    }}>
                        <span className="text">更换难度</span>
                    </button>
                    <button className="btn">
                        <span className="text">游戏玩法</span>
                    </button>
                </div>
                <div className="bottom1">
                    <img className="minepic" src={mine} alt=""/>
                </div>
                <Difficulty setPopUp={this.setPopUp}></Difficulty>
                <PopUp type="check" showPopUp={showPopUp} openNewGame={this.openNewGame} hidePopUp={this.hidePopUp}></PopUp>
            </div>
        );
    }
}

export default Home;