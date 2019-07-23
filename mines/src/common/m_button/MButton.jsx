import React, { Component } from 'react';
import { setBgm } from "../../redux/action";
import { connect } from 'react-redux'
import './mbutton.styl'
class MButton extends Component {
  state = {
    isTouching: false
  }
  componentDidMount = () => {
    const { show } = this.props
    if (show !== false) this.refs.btn.style.lineHeight = this.refs.btn.clientHeight + 'px'
  }
  componentDidUpdate = () => {
    const { show } = this.props
    if (show !== false) this.refs.btn.style.lineHeight = this.refs.btn.clientHeight + 'px'
  }
  render() {
    const { show } = this.props
    if (show !== false) {
      const { isTouching } = this.state;
      const { className, dispatch, onClick, style } = this.props
      return (
        <div ref="btn" style={style} className={`m_button ${className} ${isTouching ? 'bigger' : ''}`} onClick={() => {
          if (onClick) onClick();
          dispatch(setBgm({ type: 'CLICK' }))
        }}
          onMouseDown={() => {
            this.setState({
              isTouching: true
            })
          }}
          onTouchStart= {()=>{
            this.setState({
              isTouching: true
            })
          }}
          onMouseUp={() => {
            this.setState({
              isTouching: false
            })
          }}
          onTouchEnd={() => {
            this.setState({
              isTouching: false
            })
          }}
        >
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div></div>
      )
    }
  }
}

export default connect()(MButton);