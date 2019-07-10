export function onDoubleTouch(func){
    return function(...arg){
        let now =+new Date();
        if(now-this.dbclicktime>10 && now-this.dbclicktime<400){
            func.apply(this,arg);
            this.dbclicktime = 0;
        }else{
            this.dbclicktime = now;
        }
    }
}

