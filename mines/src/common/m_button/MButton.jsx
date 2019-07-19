import React, { Component } from 'react';
import { setBgm } from "../../redux/action";
import { connect } from 'react-redux'
import './mbutton.styl'
class MButton extends Component {
  state = { 
    isTouching:false
   }
  componentDidMount=()=>{
    this.refs.btn.style.lineHeight = this.refs.btn.clientHeight+'px'
  }
  componentDidUpdate =()=>{
    this.refs.btn.style.lineHeight = this.refs.btn.clientHeight+'px'
  }
  render() {
    const {isTouching} = this.state;
    const {className, dispatch, onClick,style} = this.props
    return ( 
      <div ref="btn" style={style} className={`m_button ${className} ${isTouching ? 'bigger' : ''}`} onClick={()=>{
        onClick();
        dispatch(setBgm({type: 'CLICK'}))
      }}
      onTouchStart={()=>{
        this.setState({
          isTouching: true
        })
      }}
      onTouchEnd={()=>{
        this.setState({
          isTouching: false
        })
      }}
      >
        {this.props.children}
      </div>
     );
  }
}
 
export default connect()(MButton);