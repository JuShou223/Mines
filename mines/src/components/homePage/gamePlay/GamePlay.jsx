import React, { Component } from 'react';
import './gameplay.styl'
class GamePlay extends Component {
  state = {  }
  render() {
    const {changShowGamePlay} =this.props
    return ( 
      <div className="gameplay_container" onClick={()=>{
        changShowGamePlay(false)
      }}>
        <div className="gheader">
          <span className="header_title">游戏介绍</span>
        </div>
        <div className="content">
          <div className="title">
            <span>游戏目标</span>
          </div>
          <div className="desc">
            <span>帮助cxk找到篮球, 你需要找到所有的空区域, 但是不能提前把篮球点开</span>
          </div>
        </div>
        <div className="content">
          <div className="title">
            <span>难度划分</span>
          </div>
          <div className="desc">
            <span>有三种难度可供选择：1. 初级（81个方块，10个篮球）；2.中级（144个方块，19个篮球）；3.高级（180个方块，29个篮球）</span>
          </div>
        </div>
        <div className="content">
          <div className="title">
            <span>长按召唤cxk</span>
          </div>
          <div className="desc">
            <span>如果你认为某个方块可能藏有篮球，就长按该方块，可以召唤一只cxk守护该方块，该方块就变成了不可点击状态，如果你只是怀疑该方块可能有篮球，那就继续长按，该方块重新变成了可点击状态，请小心使用。</span>
          </div>
        </div>
        <div className="content">
          <div className="title">
            <span>数字</span> 
          </div>
          <div className="desc">
            <span>翻开的数字代表周围有多少个篮球</span> 
          </div>
        </div>
        <div className="content">
          <div className="title">
            <span>双击</span>
          </div>
          <div className="desc">
            当已知数字周围一圈的cxk数量等于该数值时，双击数字即可翻开周围其他格子
          </div>
        </div>
      </div>
     );
  }
}
 
export default GamePlay;