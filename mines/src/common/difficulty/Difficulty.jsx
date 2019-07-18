import React, { Component } from 'react';
import { CSSTransition } from "react-transition-group";
import './difficulty.styl'
class Difficulty extends Component {
  state = {}
  render() {
    const { difficulties, showDiff, setPopUp } = this.props
    const {setDifficulty, showDifficulty} = this.props
    const difficultiesKeys = Object.keys(difficulties)
    return (
      <CSSTransition in={showDiff} timeout={300} classNames="translate">
        <div className='difficulty_container' style={{ display: showDiff ? 'block' : 'none' }}>
          <div className="mask"></div>
          <div className="box">
            <div className="header1">
              选择难度
            </div>
            {
              difficultiesKeys.map(key => {
                return (
                  <div className="difficulty btn2" key={key} onClick={()=>{
                    setDifficulty(key)
                    showDifficulty(false)
                    setPopUp();
                  }}>
                    {difficulties[key].name}
                  </div>
                )
              })
            }
          </div>
        </div>
      </CSSTransition>
    );
  }
}

export default Difficulty;