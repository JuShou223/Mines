import Difficulty from '../components/homePage/difficulty/Difficulty'
import {connect} from 'react-redux'
import { getstartY,calculatedegree,getdegree,setDiff} from "../redux/action";

const mapStateToProps = state => {
    return {
        startCilentY: state.startCilentY,
        degree: state.degree,
        difficulty: state.difficulty
    }
}


const mapDispatchToProps = dispatch => {
    return {
        getStartCilentY:(y)=>{
            dispatch(getstartY(y))
        },
        toFix:(degree)=>{
            dispatch(getdegree(degree))
        },
        calculateDegree:(startY,currentY,degree)=>{
            dispatch(calculatedegree(startY,currentY,degree))
        },
        setDiffByDegree:(degree)=>{
            dispatch(setDiff(degree))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Difficulty)