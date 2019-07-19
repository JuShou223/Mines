import HomePage from "../components/homePage/HomePage";
import {connect} from 'react-redux';
import {showDiff, gameHistory} from '../redux/action'
const mapStateToProps = state => {
    return {
        gameBoard: state.gameBoard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showDifficulty:(bool)=>{
            dispatch(showDiff(bool))
        },
        upadteGameHistory: (gameBoard) => {
            dispatch(gameHistory(gameBoard))
        }
        
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)