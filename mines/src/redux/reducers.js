import { combineReducers } from 'redux'
import * as ActionTypes from './actionTypes'
import difficultiesInit from '../creatGameBoard/difficulties'
function difficulties(difficulties = difficultiesInit, action) {
    switch (action.type) {
        case ActionTypes.UPDATE_DIFFICULTIES:
            return action.difficulties;
        default:
            return difficulties;
    }
}

function status(status={type: 'INGAME'}, action){
    switch(action.type){
        case ActionTypes.SETGAMESTATUS:
            return action.status;
        default:
            return status;
    }
}

function showDiff(showDiff = false, action) {
    switch (action.type) {
        case ActionTypes.SHOWDIFFICULTY:
            return action.showDiff
        default:
            return showDiff
    }
}

function showPopUp(showPopUp = false, action) {
    switch (action.type) {
        case ActionTypes.SHOW_POPUP:
            return action.showPopUp;
        default:
            return showPopUp
    }
}

function time(time = {hour: 0,minute: 0, second: 0}, action){
    switch (action.type){
        case ActionTypes.TIMECOUNTER:
            return action.time
        default:
            return time;
    }
}
function difficulty(difficulty = 'Easy', action) {
    switch (action.type) {
        case ActionTypes.CHANGE_DIFFICULTY:
            return action.difficulty
        default:
            return difficulty
    }
}

function gameBoard(gameBoard = null, action) {
    switch (action.type) {
        case ActionTypes.CREATE_MAP:
            return action.gameBoard;
        default:
            return gameBoard;
    }
}
export default combineReducers({
    showDiff,
    difficulty,
    gameBoard,
    difficulties,
    showPopUp,
    time,
    status
})