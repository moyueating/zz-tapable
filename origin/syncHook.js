const { SyncHook } = require('tapable');

class Car {
    constructor(){
        this.hooks = {
            accelerate: new SyncHook(['speed1', 'speed2'])
        }
    }
}

const myCar = new Car();

myCar.hooks.accelerate.tap('加速1', (speed1, speed2) => {
    console.log(speed1, speed2)
})

myCar.hooks.accelerate.call(79,343)