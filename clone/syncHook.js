// 同步钩子，依次不间断顺序执行

class SyncHook {
    constructor(...args){
        this.tasks = []
    }

    tap(name, fn){
        this.tasks.push(fn)
    }

    call(...args){
        this.tasks.forEach(task => {
            task(...args)
        })
    }
}


class Lesson {
    constructor(){
        this.hooks = {
            tec: new SyncHook(['name'])
        }
    }

}

const l = new Lesson();

l.hooks.tec.tap('node', (name) => {
    console.log('node', name)
})
l.hooks.tec.tap('react', (name) => {
    console.log('react', name)
})
l.hooks.tec.tap('vue', (name) => {
    console.log('vue', name)
})

l.hooks.tec.call('zkj')