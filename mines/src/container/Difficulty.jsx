import Difficulty from "../common/difficulty/Difficulty";
import { connect } from "react-redux";
import { changeDifficulty, showDiff} from "../redux/action";

const mapStateToProps = state => {
    return {
        difficulties: state.difficulties,
        showDiff:state.showDiff
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setDifficulty: (difficulty) => {
            dispatch(changeDifficulty(difficulty))
        },
        showDifficulty:(bool)=>{
            dispatch(showDiff(bool))
        }
    }

}
export default connect(mapStateToProps,mapDispatchToProps)(Difficulty)
