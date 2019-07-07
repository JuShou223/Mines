import HomePage from "../components/homePage/HomePage";
import {connect} from 'react-redux';
import {showDiff} from '../redux/action'
const mapStateToProps = state => {
    return {
        showDiff: state.showDiff
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showDifficulty:(bool)=>{
            dispatch(showDiff(bool))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(HomePage)