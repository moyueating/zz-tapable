class AsyncParallelHook{
    constructor(name){
        this.tasks = [];
        this.count = 0;
    }

    counter = (finalCallback) => {
        this.count++
        if(this.count === this.tasks.length){
            finalCallback()
        }
    }

    tapPromise(name, task){
        this.tasks.push(task)
    }

    promise = (...args) => {
        return Promise.all(this.tasks.map(task => task(...args)))

    }
}


class Lesson {
    constructor(){
        this.hooks = {
            tec: new AsyncParallelHook(['name'])
        }
    }
}

const l = new Lesson();

l.hooks.tec.tapPromise('node', (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 2e3)
    })

})
l.hooks.tec.tapPromise('react', (name, callback) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 5e3)
    })
})

l.hooks.tec.promise('zkj').then(() => {
    console.log('end')
})