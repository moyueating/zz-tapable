const { AsyncSeriesHook } = require('tapable');

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
l.hooks.tec.tapPromise('react', (name, callback) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('react', name);
            resolve()
        }, 2e3)
    })
})
l.hooks.tec.tapPromise('vue', (name, callback) => {
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