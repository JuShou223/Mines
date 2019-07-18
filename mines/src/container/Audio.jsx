import Audio from '../common/audio/Audio'
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
      status: state.status
  }
}
const mapDispatchToProps = dispatch => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Audio)