import * as ActionTypes from './actionTypes';

// 获取点击时的y坐标
export function getstartY(y) {
    return {
        type: ActionTypes.GETSTARTCILENTY,
        startCilentY: y
    }
}

// 角度修正
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

// 获取角度
export function getdegree(degree) {
    degree = fixDegree(degree);
    return {
        type: ActionTypes.GETDEGREE,
        degree
    }
}

// 是否显示难度选择页面
export function showDiff(bool) {
    return {
        type: ActionTypes.SHOWDIFFICULTY,
        showDiff: bool
    }
}

export function createMap(map){
    return {
        type: ActionTypes.CREATEMAP,
        map
    }
}
// 计算实时角度
export function calculatedegree(startY, currentY, degree) {
    const newDegree = (Math.round(startY - currentY) * 0.05 + degree) % 360
    return {
        type: ActionTypes.GETDEGREE,
        degree: newDegree
    }
}

// 根据角度计算难度
export function setDiff(degree) {
    degree = fixDegree(degree);
    let difficulty = {}
    if(degree===0){
        difficulty = {
            type: 'EASY',
            name: '初级',
            mines: 9,
            size: {
                x: 9,
                y: 9
            }
        }
    }
    if([60,-300].includes(degree)){
        difficulty = {
            type: 'MIDDLE',
            name: '中级',
            mines: 29,
            size: {
                x: 12,
                y: 12
            }
        }
    }
    if([120,-240].includes(degree)){
        difficulty = {
            type: 'HIGH',
            name: '高级',
            mines: 39,
            size: {
                x: 14,
                y: 14
            }
        }
    }
    if([180,-180].includes(degree)){
        difficulty = {
            type: 'TOP',
            name: '顶级',
            mines: 49,
            size: {
                x: 20,
                y: 14
            }
        }
    }
    if([240,-120].includes(degree)){
        difficulty = {
            type: 'HELL',
            name: '地狱级',
            mines: 99,
            size: {
                x: 20,
                y: 14
            }
        }
    }
    if([300,-60].includes(degree)){
        difficulty = {
            type: 'CHINAPINGPONG',
            name: '中国乒乓球级',
            mines: 149,
            size: {
                x: 20,
                y: 14
            }
        }
    }
    return {
        type: ActionTypes.SETDIFFICULTYBYDEGREE,
        difficulty
    }
}
