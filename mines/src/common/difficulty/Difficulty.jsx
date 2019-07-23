import React, { Component } from 'react';
import MButton from '../m_button/MButton'
import './difficulty.styl'
class Difficulty extends Component {
  state = {}
  render() {
    const { difficulties } = this.props
    const { setDifficulty, showDifficulty, changeShowPopUp, hasOldGame } = this.props
    const difficultiesKeys = Object.keys(difficulties)
    return (
      <div className='difficulty_container'>
        <div className="mask"></div>
        <div className="box">
          <div className="header1">
            选择难度
            </div>
          {
            difficultiesKeys.map(key => {
              return (
                <MButton className="difficulty btn2" key={key} onClick={() => {
                  setDifficulty(key)
                  showDifficulty(false)
                  if (hasOldGame()) {
                    changeShowPopUp(true)
                  };
                }}>
                  {difficulties[key].name}
                </MButton>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Difficulty;