import Play from '../components/play/Play'
import { createMap } from '../redux/action'
import { connect } from "react-redux";
const mapStateToProps = state => {
    return {
        map: state.map,
        difficulty: state.difficulty
    }
}
const mapDispatchToProps = dispatch => {
    return {
        updateMap:(map)=>{
            dispatch(createMap(map))
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Play)