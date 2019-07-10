class Grid {
    constructor(status,x,y,type,value,clickable){
        this.status = status;
        this.x = x;
        this.y = y;
        this.type = type;
        this.value = value;
        this.clickable = clickable
    }
}


export function createGrid(status,x,y,type,value,clickable){
    return new Grid(status,x,y,type,value,clickable)
}