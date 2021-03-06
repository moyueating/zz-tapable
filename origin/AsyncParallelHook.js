const { AsyncParallelHook } = require('tapable');

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
        callback();
    }, 1e3)
})
l.hooks.tec.tapAsync('react', (name, callback) => {
    setTimeout(() => {
        console.log('react', name);
        callback();
    }, 1e3)
})

l.hooks.tec.callAsync('zkj', () => {
    console.log('end')
})