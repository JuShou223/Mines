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

function difficulty(difficulty = {
    type: 'EASY',
    name: '初级',
    mines: 10,
    size: {
        x: 9,
        y: 9
    }
} , action){
    switch(action.type){
        case ActionTypes.SETDIFFICULTYBYDEGREE:
            return action.difficulty
        default:
            return difficulty
    }
}

function map (map = [], action){
    switch(action.type){
        case ActionTypes.CREATEMAP:
            return action.map;
        default:
            return map;
    }
}
export default combineReducers({
    startCilentY,
    degree,
    showDiff,
    difficulty,
    map
})