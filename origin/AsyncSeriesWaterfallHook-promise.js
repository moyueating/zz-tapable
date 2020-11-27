const { AsyncSeriesWaterfallHook } = require('tapable');

class Lesson {
    constructor(){
        this.hooks = {
            tec: new AsyncSeriesWaterfallHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tapPromise('node', (name) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('node', name);
            resolve('from node')
        }, 1e3)
    })
})
l.hooks.tec.tapPromise('react', (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('react', data);
            resolve('from react')
        }, 2e3)
    })
})
l.hooks.tec.tapPromise('vue', (data) => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('vue', data);
            resolve('vue end')
        }, 3e3)
    })
})

l.hooks.tec.promise('zkj').then(data => {
    console.log('end', data)
})