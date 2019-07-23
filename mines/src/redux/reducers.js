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

function bgm_action(bgm_action={type: 'INGAME'}, action){
    switch(action.type){
        case ActionTypes.SETBGMACTION:
            return action.bgm_action;
        default:
            return bgm_action;
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
function showGamePlay(showGamePlay = false, action){
    switch (action.type){
        case ActionTypes.SHOW_GAMEPLAY:
            return action.showGamePlay;
        default:
            return showGamePlay
    }
}

function showTip (showTip = true, action){
    switch (action.type){
        case ActionTypes.SHOW_TIP:
            return action.showTip;
        default:
            return showTip
    }
}
export default combineReducers({
    showDiff,
    difficulty,
    gameBoard,
    difficulties,
    showPopUp,
    bgm_action,
    showGamePlay,
    showTip
})
