/** 根据地雷的位置渲染出棋盘 **/  
import { createGrid } from './grid' 
export function createMinesPosition (mines, row, col) {
  let minesPosition = [];
  let minesTotal = 0;
  function createRandom(mines) {
    if (minesPosition.length === 0) {
      minesTotal = mines;
    }
    for (let i = 0; i < mines; i++) {
      let code = Math.round(Math.random() * (row * col - 1));
      if (!minesPosition.includes(code)) {
        minesPosition.push(code);
      }
    }
    let remainder = minesTotal - minesPosition.length;
    if (remainder <= 0) {
      return minesPosition
    } else {
      return createRandom(remainder)
    }
  }
  return createRandom(mines);
}

export function createMinefield (minesPosition, row, col) {
  let gameboard = [];
  for (let i = 0; i < row; i++) {
    let aRow = []
    for (let j = 0; j < col; j++) {
      let minenum = 0;
      if (minesPosition.includes(i * col + j)) {
        let grid = createGrid("hide", i, j, "mine", minenum, '')
        aRow.push(grid)
      } else {
        for (let k = 0; k < 9; k++) {
          let newi = i - 1 + Math.floor(k / 3);
          let newj = j - 1 + k % 3;
          if (newi >= 0 && newi < row && newj >= 0 && newj < col) {
            if (newi !== i || newj !== j) {
              if (minesPosition.includes(newi * col + newj)) {
                minenum++;
              }
            }
          }
        }
        if (minenum > 0) {
          let grid = createGrid("hide", i, j, "number", minenum, '')
          aRow.push(grid)
        } else {
          let grid = createGrid("hide", i, j, "blank", minenum, '')
          aRow.push(grid)
        }
      }
    }
    gameboard.push(aRow)
  }
  return gameboard
}
