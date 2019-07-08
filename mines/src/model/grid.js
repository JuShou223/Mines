class Grid {
    constructor(status,x,y,type,value){
        this.status = status;
        this.x = x;
        this.y = y;
        this.type = type;
        this.value = value;
    }
}


export function createGrid(status,x,y,type,value){
    return new Grid(status,x,y,type,value)
}