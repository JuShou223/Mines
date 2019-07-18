import PopUp from '../common/popup/PopUp'
import { connect } from "react-redux";
import { gameHistory} from '../redux/action'

const mapStateToProps = state => {
  return {
      difficulty: state.difficulty,
      difficulties: state.difficulties,
      gameStatus: state.gameStatus
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upadteGameHistory: (gameBoard) => {
      dispatch(gameHistory(gameBoard))
    }
  }

}
export default connect(mapStateToProps,mapDispatchToProps)(PopUp)