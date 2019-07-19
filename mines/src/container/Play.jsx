import Play from '../components/play/Play'
import { connect } from "react-redux";
import { gameHistory, setBgm} from '../redux/action'

const mapStateToProps = state => {
    return {
        gameBoard: state.gameBoard,
        difficulty: state.difficulty
    }
}
const mapDispatchToProps = dispatch => {
    return {
        upadteGameHistory: (gameBoard) => {
            dispatch(gameHistory(gameBoard))
        },
        setBgmAction: (bgm_action) => {
            dispatch(setBgm(bgm_action))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Play)