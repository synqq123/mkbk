function throttle(fn,interval, heading=false, tailing=false) {
    let lastTime=0
    let timer =null

    return function _throttle(...args) {

        if(timer){
            clearTimeout(timer)
            timer=null
        }
        let nowTime = new Date().getTime();
        if(!lastTime&&heading) lastTime=nowTime
        const remainTime=interval-(nowTime-lastTime)
        if(remainTime<=0){
            fn.apply(this,args) 
            lastTime=nowTime
        }else if(tailing){
            timer=setTimeout(()=>{
                fn.apply(this,args) 
            },remainTime)
        }
    }
}
