import React, { Component } from 'react';
import images from '../../assets/image/index'
import Difficulty from '../../container/Difficulty'
import PopUp from '../../container/PopUp'
import MButton from '../../common/m_button/MButton'
import './homePage.styl'

class Home extends Component {
    state = {
        showPopUp: false
    }
    setPopUp = () => {
        const { gameBoard } = this.props
        if (gameBoard) {
            this.setState({
                showPopUp: true
            })
        }
    }
    hidePopUp = () => {
        this.setState({
            showPopUp: false
        })
    }
    openNewGame = () => {
        const { upadteGameHistory } = this.props;
        upadteGameHistory(null);
        this.props.history.push('/play')
    }
    openOldGame = () => {
        this.props.history.push('/play')
    }
    render() {
        console.log(images)
        const { gameBoard } = this.props
        const { showDifficulty} = this.props;
        const { showPopUp } = this.state
        return (
            <div className='home_container' style={{backgroundImage: `url(${images.normal.backgroundIMG})`}}>
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
                    <MButton className="btn" style={{ display: gameBoard ? 'block' : 'none' }}
                        onClick={() => {
                            this.openOldGame()
                        }}>
                        <span className="text">继续游戏</span>
                    </MButton>
                    <MButton className="btn" onClick={() => {
                        showDifficulty(true)
                    }}>
                        <span className="text">更换难度</span>
                    </MButton>
                    <MButton className="btn" onClick={() => {
                    }}>
                        <span className="text">游戏玩法</span>
                    </MButton>
                </div>
                <div className="bottom1">
                    <img className="minepic" src={images.normal.bottomLogo} alt="" />
                </div>
                <Difficulty setPopUp={this.setPopUp}></Difficulty>
                <PopUp type="check" showPopUp={showPopUp} openNewGame={this.openNewGame} hidePopUp={this.hidePopUp}></PopUp>
            </div>
        );
    }
}

export default Home;