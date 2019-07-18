import Play from '../components/play/Play'
import { connect } from "react-redux";
import { gameHistory, setStatus} from '../redux/action'

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
        setGameStatus: (status) => {
            dispatch(setStatus(status))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Play)