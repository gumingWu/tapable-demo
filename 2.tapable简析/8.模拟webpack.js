const { SyncHook, AsyncSeriesHook, AsyncParallelHook } = require('tapable')

class Compiler {
    constructor() {
        this.hooks = {
            compile: new SyncHook(),
            run: new AsyncSeriesHook(),
            make: new AsyncParallelHook()
        }

        this.hooks.compile.tap('compile', () => {
            console.log('开始执行compile hook')
        })
        this.hooks.run.tapAsync('run', (cb) => {
            console.log('开始执行run hook')
            cb()
        })
        this.hooks.make.tapPromise('make', () => {
            return new Promise(resolve => {
                console.log('开始执行make hook')
                resolve()
            })
        })
    }
}

function webpack(options = {}) {
    const { entry = '', plugins = [] } = options    // 获取参数

    const compiler = new Compiler() // 创建compiler
    compiler.result = entry // 存储入参，用于后续操作

    plugins.forEach(plugin => { // 遍历plugin并执行，如果plugin有调用hook，则这时候注册对应的事件
        plugin.apply(compiler)
    })

    // compile阶段
    compiler.hooks.compile.call()

    // run阶段
    compiler.hooks.run.tapAsync('run', () => {})    // callback结构的回调，需要在最后加个不调用cb的回调
    compiler.hooks.run.callAsync()

    // make阶段
    compiler.hooks.make.promise()

    console.log('最终打包结果：', compiler.result)
}

// 自定义plugin
class StartPlugin {
    constructor(options = {}) {
        this.startStr = options.startStr
    }

    apply(compiler) {
        compiler.hooks.compile.tap('start', () => {
            console.log('执行StartPlugin')
            compiler.result = `${this.startStr} ${compiler.result}`
        })
    }
}

class EndPlugin {
    constructor(options = {}) {
        this.endStr = options.endStr
    }

    apply(compiler) {
        compiler.hooks.compile.tap('end', () => {
            console.log('执行EndPlugin')
            compiler.result = `${compiler.result} ${this.endStr}`
        })
    }
}

class AsyncPlugin {
    apply(compiler) {
        compiler.hooks.make.tapPromise(this.constructor.name, () => {
            return new Promise(resolve => {
                console.log('执行AsyncPlugin')
                resolve()
            })
        })
    }
}

// 开始执行打包
webpack({
    entry: 'gaaming',
    plugins: [
        new StartPlugin({
            startStr: 'start hhh'
        }),
        new EndPlugin({
            endStr: 'end hhh'
        }),
        new AsyncPlugin()
    ]
})