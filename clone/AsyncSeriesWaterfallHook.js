class AsyncSeriesWaterfallHook {
    constructor(args){
        this.tasks = [];
    }

    tapAsync(name, task){
        this.tasks.push(task)
    }

    callAsync(...args){
        const final = args.pop();
        let index = 0;
        let next = (err, data) => {
            if(err) return final(err)

            const task = this.tasks[index]
            if(!task) return final()

            if(index === 0){
                task(...args, next);
            }else{
                task(data, next)
            }
            index++;
        }
        
        next();
    }
}

class Lesson {
    constructor(){
        this.hooks = {
            tec: new AsyncSeriesWaterfallHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tapAsync('node', (name, callback) => {
    setTimeout(() => {
        console.log('node', name);
        callback(111, 'from node')
    }, 1e3)
})
l.hooks.tec.tapAsync('react', (name, callback) => {
    setTimeout(() => {
        console.log('react', name);
        callback(null, 'from react')
    }, 2e3)
})
l.hooks.tec.tapAsync('vue', (name, callback) => {
    setTimeout(() => {
        console.log('vue', name);
        callback(null)
    }, 3e3)
})

l.hooks.tec.callAsync('zkj', data => {
    console.log('end', data)
})