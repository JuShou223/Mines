import React, { Component } from 'react';
import { audioMp3 } from '../../assets/audio/index'

class Audio extends Component {
  state = { 
   }
  componentWillReceiveProps=(next)=>{
    const {type} = next.status;
    this.play(type)
  }
  play = (action) => {
    this.replay()
    switch (action) {
      case 'SHOWONE':
        this.refs.click.play()
        break;
      case 'SHOWROUNDSUCCESS':
        this.refs.showone.play()
        break;
      case 'GAMELOSE':
        setTimeout(() => {
          this.refs.fail.play()
        }, 1800);
        this.refs.touchmine.play()
        break;
      case 'GAMESUCCESS':
          setTimeout(() => {
            this.refs.success.play()
          }, 1800);
        this.refs.showround.play()
        break;
      case 'CHANGETAG':
        this.refs.flag.play()
        break;
      case 'SHOWROUNDFAIL':
        this.refs.warning.play()
        break;
      default:
        break;
    }
  }
  replay =()=>{
    this.refs.click.currentTime = 0;
    this.refs.showone.currentTime = 0;
    this.refs.showround.currentTime = 0;
    this.refs.warning.currentTime = 0;
    this.refs.fail.currentTime = 0;
    this.refs.success.currentTime = 0;
    this.refs.touchmine.currentTime = 0;
    this.refs.flag.currentTime = 0.5;
    this.refs.click.pause()
    this.refs.showone.pause()
    this.refs.showround.pause()
    this.refs.warning.pause()
    this.refs.fail.pause()
    this.refs.success.pause()
    this.refs.touchmine.pause()
    this.refs.flag.pause()
  }
  render() { 
    return ( 
      <div>
        <audio src={audioMp3.click} preload="preload" ref="click"></audio>
        <audio src={audioMp3.showone} preload="preload" ref="showone"></audio>
        <audio src={audioMp3.showround} preload="preload" ref="showround"></audio>
        <audio src={audioMp3.waring} preload="preload" ref="warning"></audio>
        <audio src={audioMp3.fail} preload="preload" ref="fail"></audio>
        <audio src={audioMp3.success} preload="preload" ref="success"></audio>
        <audio src={audioMp3.touchmine} preload="preload" ref="touchmine"></audio>
        <audio src={audioMp3.flag} preload="preload" ref="flag"></audio>
      </div>
     );
  }
}
 
export default Audio;