import * as ActionTypes from './actionTypes'
export function getstartY(y) {
    return {
        type: ActionTypes.GETSTARTCILENTY,
        startCilentY: y
    }
}
function fixDegree(degree){
    let newdegree = degree % 60;
    if (newdegree > 0) {
        newdegree = newdegree > 30 ? 60 : 0;
    } else {
        newdegree = newdegree > -30 ? 0 : -60;
    }
    degree = degree - degree % 60 + newdegree;
    return degree;
}
export function getdegree(degree) {
    degree = fixDegree(degree);
    return {
        type: ActionTypes.GETDEGREE,
        degree
    }
}

export function showDiff(bool) {
    return {
        type: ActionTypes.SHOWDIFFICULTY,
        showDiff: bool
    }
}

export function calculatedegree(startY, currentY, degree) {
    const newDegree = (Math.round(startY - currentY) * 0.05 + degree) % 360
    return {
        type: ActionTypes.GETDEGREE,
        degree: newDegree
    }
}

export function setDiff(degree) {
    degree = fixDegree(degree)
    switch (degree) {
        case 60:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'MIDDLE'
            }
        case -60:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'CHINAPINGPONG'
            }
        case 120:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'HIGH'
            }
        case -120:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'HELL'
            }
        case 180:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'TOP'
            }
        case -180:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'TOP'
            }
        case 240:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'HELL'
            }
        case -240:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'HIGH'
            }
        case 300:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'CHINAPINGPONG'
            }
        case -300:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'MIDDLE'
            }
        default:
            return {
                type: ActionTypes.SETDIFFICULTYBYDEGREE,
                difficulty: 'EASY'
            }
    }
}