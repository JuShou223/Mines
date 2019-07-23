import Play from '../components/play/Play'
import { connect } from "react-redux";
import { gameHistory, setBgm, showPopUp } from '../redux/action'

const mapStateToProps = state => {
    return {
        gameBoard: state.gameBoard,
        difficulty: state.difficulty,
        showPopUp: state.showPopUp,
        difficulties: state.difficulties
    }
}
const mapDispatchToProps = dispatch => {
    return {
        upadteGameHistory: (gameBoard) => {
            dispatch(gameHistory(gameBoard))
        },
        setBgmAction: (bgm_action) => {
            dispatch(setBgm(bgm_action))
        },
        changeShowPopUp: (bool) => {
            dispatch(showPopUp(bool))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Play)