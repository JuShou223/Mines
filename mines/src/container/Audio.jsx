import Audio from '../common/audio/Audio'
import { connect } from "react-redux"

const mapStateToProps = state => {
  return {
    bgm_action: state.bgm_action
  }
}
export default connect(mapStateToProps)(Audio)