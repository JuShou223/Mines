// import Difficulty from '../components/homePage/difficulty/Difficulty'
// import {connect} from 'react-redux'
// import { getstartY,calculatedegree,getdegree,setDiff} from "../redux/action";

// const mapStateToProps = state => {
//     return {
//         startCilentY: state.startCilentY,
//         degree: state.degree,
//         difficulty: state.difficulty
//     }
// }


// const mapDispatchToProps = dispatch => {
//     return {
//         getStartCilentY:(y)=>{
//             dispatch(getstartY(y))
//         },
//         toFix:(degree)=>{
//             dispatch(getdegree(degree))
//         },
//         calculateDegree:(startY,currentY,degree)=>{
//             dispatch(calculatedegree(startY,currentY,degree))
//         },
//         setDiffByDegree:(degree)=>{
//             dispatch(setDiff(degree))
//         }
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Difficulty)

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
