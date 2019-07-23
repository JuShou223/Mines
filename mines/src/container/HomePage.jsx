import HomePage from "../components/homePage/HomePage"
import {connect} from 'react-redux'
import {showDiff, gameHistory, changeDifficulty, showPopUp, showGamePlay, showTip} from '../redux/action'
const mapStateToProps = state => {
    return {
        gameBoard: state.gameBoard,
        difficulties: state.difficulties,
        showDiff:state.showDiff,
        showPopUp: state.showPopUp,
        showGamePlay: state.showGamePlay,
        showTip: state.showTip
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showDifficulty:(bool)=>{
            dispatch(showDiff(bool))
        },
        upadteGameHistory: (gameBoard) => {
            dispatch(gameHistory(gameBoard))
        },
        setDifficulty: (difficulty) => {
            dispatch(changeDifficulty(difficulty))
        },
        changeShowPopUp: (bool) => {
            dispatch(showPopUp(bool))
        },
        changShowGamePlay: (bool) => {
            dispatch(showGamePlay(bool))
        },
        changeShowTip: (bool) => {
            dispatch(showTip(bool))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)