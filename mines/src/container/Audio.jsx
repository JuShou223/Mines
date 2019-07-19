import Audio from '../common/audio/Audio'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    bgm_action: state.bgm_action
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Audio)