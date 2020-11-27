class AsyncParallelHook{
    constructor(name){
        this.tasks = [];
        this.count = 0;
    }

    counter = (error, finalCallback) => {
        this.count++
        if(error || this.count === this.tasks.length){
            finalCallback()
        }
    }

    tapAsync(name, task){
        this.tasks.push(task)
    }

    callAsync = (...args) => {
        const finalCallback = args.pop();
        this.tasks.forEach(task => {
            task(...args, (error) => this.counter(error, finalCallback))
        })

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

l.hooks.tec.tapAsync('node', (name, callback) => {
    setTimeout(() => {
        console.log('node', name);
        callback('ssss');
    }, 2e3)
})
l.hooks.tec.tapAsync('react', (name, callback) => {
    setTimeout(() => {
        console.log('react', name);
        callback();
    }, 5e3)
})

l.hooks.tec.callAsync('zkj', () => {
    console.log('end')
})


