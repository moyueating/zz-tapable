// 同步钩子，如果其中一个事件有非undefined的返回值就中断执行

class SyncHook {
    constructor(...args){
        this.tasks = []
    }

    tap(name, fn){
        this.tasks.push(fn)
    }

    call(...args){
        let ret, index = 0;
        do {
            ret = this.tasks[index](...args);
            index++;
        } while (ret === undefined && index < this.tasks.length);
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
    return 'node fail'
})
l.hooks.tec.tap('react', (name) => {
    console.log('react', name)
})
l.hooks.tec.tap('vue', (name) => {
    console.log('vue', name)
})

l.hooks.tec.call('zkj')