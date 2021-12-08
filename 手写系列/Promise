const PROMISE_STATUS_PENDDING = "pending"
const PROMISE_STATUS_FULFILLED = "fulfilled"
const PROMISE_STATUS_REJECTED = "rejected"


//捕获异常函数
function fun(exe, value, resolve, reject) {
    try {
        let result = exe(value)
        resolve(result)
    } catch (err) {
        reject(err)
    }
}

class myPromise {
    constructor(executor) {
        this.state = PROMISE_STATUS_PENDDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledFns = []
        this.onRejectedFns = []

        const resolve = (value) => {
            if (this.state === PROMISE_STATUS_PENDDING) {
                queueMicrotask(() => {
                    if (this.state === PROMISE_STATUS_PENDDING) {
                        this.state = PROMISE_STATUS_FULFILLED
                        this.value = value
                        this.onFulfilledFns.forEach(fn => {
                            fn()
                        })
                    }
                })
            }
        }
        const reject = (reason) => {
            if (this.state === PROMISE_STATUS_PENDDING) {
                queueMicrotask(() => {
                    if (this.state === PROMISE_STATUS_PENDDING) {
                        this.state = PROMISE_STATUS_REJECTED
                        this.reason = reason
                        this.onRejectedFns.forEach(fn => {
                            fn()
                        })
                    }
                })
            }
        }

        try {
            executor(resolve, reject);
        } catch (err) {
            reject(err)
        }
    }
    
    
    //then方法（核心）
    then(onFulfilled, onRejected) {
        onFulfilled = onFulfilled || (res => {
            return res
        })
        onRejected = onRejected || (err => {
            throw err
        })
        return new myPromise((resolve, reject) => {
            if (this.state === PROMISE_STATUS_PENDDING) {
                this.onFulfilledFns.push(() => {
                    fun(onFulfilled, this.value, resolve, reject)
                })
                this.onRejectedFns.push(() => {
                    fun(onRejected, this.reason, resolve, reject)
                })
            }
            if (this.state === PROMISE_STATUS_FULFILLED) {
                fun(onFulfilled, this.value, resolve, reject)
            }
            if (this.state === PROMISE_STATUS_REJECTED) {
                fun(onRejected, this.reason, resolve, reject)
            }
        })
    }
    catch (onRejected) {
        return this.then(undefined, onRejected)
    } 
    
    finally(onFinnally) {
        this.then(onFinnally, onFulfilled)
    }

    //面试常问
    static all(promises){
        let values=[]
        return new myPromise((resolve, reject) => {
            promises.forEach(promise =>{
                promise.then(res=>{
                    values.push(res)
                    if(values.length===promises.length) resolve(values)
                },err=>{
                    reject(err)
                })
            })
        })
    }

    static allSettled(promises){
        let values=[]
        return new myPromise((resolve, reject) => {
            promises.forEach(promise=>{
                promise.then(res=>{
                    values.push({status: PROMISE_STATUS_FULFILLED, value:res})
                    if(values.length===promises.length) resolve(values)
                }, err=>{
                    values.push({status: PROMISE_STATUS_REJECTED, reason: err})
                    if(values.length===promises.length) resolve(values)
                })
            })
        })
    }

    //面试常问
    static race(promises){
        return new myPromise((resolve, reject) => {
            promises.forEach(promise=>{
                promise.then(resolve, reject)
            })
        })
    }

    static any(promises){
        reasons=[]
        return new myPromise((resolve, reject) => {
            promises.forEach(promise=>{
                promise.then(resolve, err=>{
                    reasons.push(err)
                    if(reasons.length===promises.length) reject(reasons)
                })
            })
        })
    }
}
