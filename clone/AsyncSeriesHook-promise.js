
// 异步串行promise版本，后者不依赖前者返回值

class AsyncSeriesHook {
    constructor(name){
        this.tasks = []
    }

    tapPromise(name, task){
        this.tasks.push(task)
    }

    promise(...args) {
        const [first, ...others] = this.tasks
        return others.reduce((pre, next) => {
            return pre.then(() => next(...args))
        }, first(...args))
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

l.hooks.tec.tapPromise('node', (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('node', name);
            resolve()
        }, 1e3)
    })
})
l.hooks.tec.tapPromise('react', (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('react', name);
            resolve()
        }, 2e3)
    })
})
l.hooks.tec.tapPromise('vue', (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('vue', name);
            resolve()
        }, 3e3)
    })
})

l.hooks.tec.promise('zkj').then(() => {
    console.log('end')
})