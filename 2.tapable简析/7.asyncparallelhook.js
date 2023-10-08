const { AsyncParallelHook } = require('tapable');

class Person {
  constructor() {
    this.hooks = {
      actions: new AsyncParallelHook(),
    };
  }

  run() {
    this.hooks.actions.callAsync();
  }
}

const man = new Person();

man.hooks.actions.tapAsync('run', (cb) => {
  console.log('running 3000');
  setTimeout(() => {
    console.log('run stop');
    cb();
  }, 3000);
});

man.hooks.actions.tapAsync('music', () => {
  console.log('listening music 2000');
  setTimeout(() => {
    console.log('music stop');
  }, 2000);
});

man.run();
