const { AsyncSeriesHook } = require('tapable');

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