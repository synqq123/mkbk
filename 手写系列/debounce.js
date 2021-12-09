function debounce(fn, delay,immediate=false) {
    let timer=null
    let isIvoke=false
    return function _debounce(...args) {
        if(timer) clearTimeout(timer)
        if(!isIvoke&&immediate){
            fn.apply(this,args)
            isIvoke=true
        }else{
            timer=setTimeout(()=>{
                fn.apply(this,args)
                isIvoke=false
            })
        }
    }
}
