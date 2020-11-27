const { AsyncSeriesWaterfallHook } = require('tapable');

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
        callback(null, 'from node')
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