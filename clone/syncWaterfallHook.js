// 同步钩子，瀑布流式，上一个任务执行的返回结果用于下一个任务的入参
// 如果只有第一个有返回，那么后面的任务都依赖第一个返回值

class SyncWaterfallHook {
    constructor(...args){
        this.tasks = []
    }

    tap(name, fn){
        this.tasks.push(fn)
    }

    call(...args){
        this.tasks.reduce((pre, current, index) => {
            if(index === 0) {
                return current(...args)
            }else{
                let ret = current(pre)
                return ret ? ret : pre
            }
        }, null)
    }
}

class Lesson {
    constructor(){
        this.hooks = {
            tec: new SyncWaterfallHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tap('node', (name) => {
    console.log('node', name)
    return 'node ok'
})
l.hooks.tec.tap('react', (data) => {
    console.log('pre result:', data)
    return 'react ok'
})
l.hooks.tec.tap('vue', (data) => {
    console.log('pre result:', data)
})
l.hooks.tec.tap('webpack', (data) => {
    console.log('pre result:', data)
})

l.hooks.tec.call('zkj')