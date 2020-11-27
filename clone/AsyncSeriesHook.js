// 异步串行回调版本，后者不依赖前者返回值

class AsyncSeriesHook {
    constructor(name){
        this.tasks = []
    }

    tapAsync(name, task){
        this.tasks.push(task)
    }

    callAsync(...args){
        const finalCallback = args.pop()
        function next(tasks){
            const [firstTask, ...others] = tasks;
            if(firstTask){
                firstTask(...args, () => next(others))
            }else{
                finalCallback()
            }
        }
        next(this.tasks)
    }
}

class Lesson {
    constructor(){
        this.hooks = {
            tec: new AsyncSeriesHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tapAsync('node', (name, callback) => {
    setTimeout(() => {
        console.log('node', name);
        callback()
    }, 1e3)
})
l.hooks.tec.tapAsync('react', (name, callback) => {
    setTimeout(() => {
        console.log('react', name);
        callback()
    }, 2e3)
})
l.hooks.tec.tapAsync('vue', (name, callback) => {
    setTimeout(() => {
        console.log('vue', name);
        callback()
    }, 3e3)
})

l.hooks.tec.callAsync('zkj', () => {
    console.log('end')
})