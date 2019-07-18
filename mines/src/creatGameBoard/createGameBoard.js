import difficulties from './difficulties';
import { createMinesPosition, createMinefield } from './createMineField.js';
export function createGameBoard(difficulty) {
  const { mines, size } = difficulties[difficulty];
  const { row, col } = size;
  const minesPosition = createMinesPosition(mines, row, col)
  const minefield = createMinefield(minesPosition, row, col);
  const clock = 0;
  const flagPosition = [];
  const listener = []; //监听者
  let dbclicktime = 0;
  let showNum = 0;
  let lock = false;
  let lastTarget = null;
  let leftFlag = mines;
  let leftMines = mines;
  let timeout = null;
  let passTouchEnd = false;
  let gameStatus = 'INGAME';

  function subscribe(listen) {
    listener.push(listen) //订阅发布者
  }

  function setLastTarget(x, y) {
    lastTarget = minefield[x][y]
  }

  function dispatch(action) {
    switch (action.type) {
      case 'SHOWONE':
        showOne(action.position.x, action.position.y);
        break;
      case 'SHOWROUNDSUCCESS':
        showRound(action.position.x, action.position.y);
        break;
      case 'GAMELOSE':
        gamelose();
        break;
      case 'GAMESUCCESS':
        gamesuccess();
        break;
      case 'CHANGETAG':
        changeTag(action.position.x, action.position.y);
        break;
      default:
        break;
    }
    listener.forEach(item => {
      item(action.type)
    })
    check();
  }

  function check() {
    if (lock === false) {
      switch (gameStatus) {
        case 'GAMELOSE':
          dispatch({ type: 'GAMELOSE' });
          break;
        case 'GAMESUCCESS':
          dispatch({ type: 'GAMESUCCESS' });
          break;
        default:
          break;
      }
    }
  }

  function clearListener() {
      listener.pop();
  }
  function onTouchStart(x, y) {
    if (!lock) {
      if (minefield[x][y].status !== 'hide') {
        onDoubleTouch(x, y);
      } else {
        onLongTouch(x, y);
      }
      setLastTarget(x, y);
    }
  }

  function onTouchEnd(x, y) {
    if (!lock) {
      clearTimeout(timeout)
      if (!passTouchEnd) {
        onClick(x, y)
      } else {
        passTouchEnd = false;
      }
    }
  }

  function onClick(x, y) {
    if (minefield[x][y].status === 'hide' && minefield[x][y].tag !== 'flag') {
      dispatch({ type: 'SHOWONE', position: { x, y } })
    }
  }

  function showOne(x, y) {
    if (minefield[x][y].status === 'hide' && minefield[x][y].tag !== 'flag') {
      minefield[x][y].status = 'show';
      minefield[x][y].tag = '';
      switch (minefield[x][y].type) {
        case 'mine':
          gameStatus = 'GAMELOSE';
          lastTarget = minefield[x][y];
          setLastTarget(x, y)
          break;
        case 'blank':
          showRound(x, y)
          break;
        default:
          break;
      }
      showNum++;
      if (showNum === row * col - mines && gameStatus === 'INGAME') {
        gameStatus = "GAMESUCCESS"
      }
    }
  }
  function onDoubleTouch(x, y) {
    let now = +new Date();
    if (now - dbclicktime > 10 && now - dbclicktime < 400 && x === lastTarget.x && y === lastTarget.y) {
      dbclicktime = 0;
      if (checkFlag(x, y)) {
        dispatch({ type: 'SHOWROUNDSUCCESS', position: { x, y } })
      } else {
        dispatch({ type: 'SHOWROUNDFAIL', position: { x, y } })
      }
    } else {
      dbclicktime = now;
    }
  }
  function showRound(x, y) {
    for (let k = 0; k < 9; k++) {
      let newX = x - 1 + Math.floor(k / 3);
      let newY = y - 1 + k % 3;
      if (newX >= 0 && newX < row && newY >= 0 && newY < col && (newX !== x || newY !== y)) {
        showOne(newX, newY)
      }
    }
  }


  function onLongTouch(x, y) {
    timeout = setTimeout(() => {
      if (leftFlag>0 || minefield[x][y].tag !== '') {
        dispatch({ type: 'CHANGETAG', position: { x, y } })
      } else {
        dispatch({ type: 'SHOWROUNDFAIL', position: { x, y } })
      }
      passTouchEnd = true;
    }, 200);
  }
  function changeTag(x, y) {
    switch (minefield[x][y].tag) {
      case 'flag':
        minefield[x][y].tag = 'uncertain';
        leftFlag++;
        if (minefield[x][y].type === 'mine') {
          leftMines++
        }
        flagPosition.splice(flagPosition.indexOf(x*col+y),1)
        break;
      case 'uncertain':
        minefield[x][y].tag = '';
        break;
      default:
        minefield[x][y].tag = 'flag';
        leftFlag--;
        if (minefield[x][y].type === 'mine') {
          leftMines--
        }
        flagPosition.push(x*col+y)
        break;
    }
  }

  function gamelose() {
    lock = true;
    minesPosition.forEach(item => {
      let x = Math.floor(item / col);
      let y = item % col;
      minefield[x][y].status = 'show'
    })
    flagPosition.forEach(item=>{
      let x = Math.floor(item / col);
      let y = item % col;
      minefield[x][y].status = 'show'
    })
  }
  function gamesuccess() {
    leftMines = 0;
    lock = true;
  }
  function checkFlag(x, y) {
    let flagnum = 0;
    for (let k = 0; k < 9; k++) {
      let newX = x - 1 + Math.floor(k / 3);
      let newY = y - 1 + k % 3;
      if (newX >= 0 && newX < row && newY >= 0 && newY < col) {
        if (newX !== x || newY !== y) {
          if (minefield[newX][newY].tag === 'flag') {
            flagnum++
          }
        }
      }
    }
    return lastTarget.value === flagnum ? true : false;
  }

  function getLeftFlag(){
    return leftFlag
  }

  function getLeftMine(){
    return leftMines
  }
  return {
    subscribe,
    onTouchEnd,
    minefield,
    onTouchStart,
    getLeftFlag,
    getLeftMine,
    clock,
    clearListener
  }
}