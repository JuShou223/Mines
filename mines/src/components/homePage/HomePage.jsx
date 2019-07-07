import React, { Component } from 'react';
import logo from '../../assets/logo.png'
import mine from '../../assets/mine.png'
import Difficulty from '../../container/Difficulty'
import './homePage.styl'

class Home extends Component {
    state = {}
    render() {
        const {showbtn,showDiff} = this.props
        const {showDifficulty} = this.props
        return (
            <div className='container'>
                <div className="header">
                    <img className="logo" src={logo} alt="" />
                    <div className="title text">扫雷</div>
                </div>
                <div className="content">
                    <button className="btn">
                        <span className="text">新游戏</span>
                    </button>
                    <button className="btn" onClick={()=>{
                        setTimeout(() => {
                        showDifficulty(true)                            
                        }, 400);
                    }}>
                        <span className="text">更换难度</span>
                    </button>
                    <button className="btn" style={{display: showbtn ? 'block' : 'none'}}>
                        <span className="text">继续游戏</span>
                    </button>
                    <button className="btn">
                        <span className="text">游戏玩法</span>
                    </button>
                </div>
                <div className="bottom">
                    <img className="minepic" src={mine} alt=""/>
                </div>
                <Difficulty showDiff={showDiff} showDifficulty={showDifficulty}></Difficulty>
            </div>
        );
    }
}

export default Home;