const { SyncBailHook } = require('tapable')

class Lesson {
    constructor(){
        this.hooks = {
            tec: new SyncBailHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tap('node', (name) => {
    console.log('node', name)
    return 'fail'
})
l.hooks.tec.tap('react', (name) => {
    console.log('react', name)
})
l.hooks.tec.tap('vue', (name) => {
    console.log('vue', name)
})

l.hooks.tec.call('zkj')