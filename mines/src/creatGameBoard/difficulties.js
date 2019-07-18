class difficulty {
  constructor (type, name, mines, size, bestGrade){
    this.type = type;
    this.mines = mines;
    this.size = size;
    this.name = name;
    this.bestGrade = bestGrade;
  }
}

function init_Difficulties(){
  const Easy = new difficulty('Easy', '初级', 10, {row: 9, col: 9}, 9999999999999999999999)
  const Normal = new difficulty('Normal', '中级', 29, {row: 12, col: 12}, 9999999999999999999999)
  const Difficult = new difficulty('Difficult', '高级', 39, {row: 15, col: 12}, 9999999999999999999999)
  const difficulties = {}
  difficulties.Easy = Easy
  difficulties.Normal = Normal
  difficulties.Difficult = Difficult
  return difficulties
}
const difficulties = init_Difficulties()
export default difficulties
