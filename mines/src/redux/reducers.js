import {combineReducers} from 'redux'
import * as ActionTypes from './actionTypes'

function startCilentY(startCilentY = 0, action){
    switch(action.type){
        case ActionTypes.GETSTARTCILENTY:
            return action.startCilentY
        default:
            return startCilentY
    }
}


function degree(degree = 0, action){
    switch(action.type){
        case ActionTypes.GETDEGREE:
            return action.degree
        default:
            return degree
    }
}

function showDiff(showDiff = false, action){
    switch(action.type){
        case ActionTypes.SHOWDIFFICULTY:
            return action.showDiff
        default:
            return showDiff
    }
}

function difficulty(difficulty = 'EASY', action){
    switch(action.type){
        case ActionTypes.SETDIFFICULTYBYDEGREE:
            return action.difficulty
        default:
            return difficulty
    }
}
export default combineReducers({
    startCilentY,
    degree,
    showDiff,
    difficulty
})