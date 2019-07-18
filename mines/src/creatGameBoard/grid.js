class Grid {
    constructor(status,x,y,type,value,tag){
        this.status = status;
        this.x = x;
        this.y = y;
        this.type = type;
        this.value = value;
        this.tag = tag
    }
}

export function createGrid(status,x,y,type,value,tag){
    return new Grid(status,x,y,type,value,tag)
}