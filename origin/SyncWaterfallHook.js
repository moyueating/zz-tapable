const { SyncWaterfallHook } = require('tapable')

class Lesson {
    constructor(){
        this.hooks = {
            tec: new SyncWaterfallHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tap('node', (name) => {
    console.log('node', name)
    return 'node ok'
})
l.hooks.tec.tap('react', (data) => {
    console.log('pre result:', data)
    return 'react ok'
})
l.hooks.tec.tap('vue', (data) => {
    console.log('pre result:', data)
})

l.hooks.tec.call('zkj')