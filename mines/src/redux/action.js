import * as ActionTypes from './actionTypes';

export function showPopUp (bool) {
    return {
        type: ActionTypes.SHOW_POPUP,
        showPopUp: bool
    }
}
export function changeDifficulty(difficulty){
    return {
        type: ActionTypes.CHANGE_DIFFICULTY,
        difficulty
    }
}

export function showDiff(bool) {
    return {
        type: ActionTypes.SHOWDIFFICULTY,
        showDiff: bool
    }
}

export function gameHistory(gameBoard){
    return {
        type: ActionTypes.CREATE_MAP,
        gameBoard
    }
}

export function setStatus(status){
    return {
        type: ActionTypes.SETGAMESTATUS,
        status
    }
}