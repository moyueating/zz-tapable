const { AsyncParallelHook } = require('tapable');

class Lesson {
    constructor(){
        this.hooks = {
            tec: new AsyncParallelHook(['name'])
        }
    }
}

const l = new Lesson();

l.hooks.tec.tapPromise('node', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('node', name);
            resolve();
        }, 1e3)
    })

})
l.hooks.tec.tapPromise('react', (name) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('react', name);
            resolve();
        }, 3e3)
    })
})

l.hooks.tec.promise('zkj').then(() => {
    console.log('end')
})