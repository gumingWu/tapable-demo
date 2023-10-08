const { AsyncSeriesHook } = require('tapable');

class Person {
  constructor() {
    this.hooks = {
      wait: new AsyncSeriesHook(),
    };
  }

  wait() {
    this.hooks.wait.callAsync();
  }

  waitPromise() {
    this.hooks.wait.promise();
  }
}

const man = new Person();
man.hooks.wait.tapAsync('wait', (cb) => {
  console.log('wait 3000');
  setTimeout(() => {
    cb();
  }, 3000);
});
man.hooks.wait.tapAsync('wait', () => {
  console.log('wait 2000');
  setTimeout(() => {
    console.log('执行完成');
  }, 2000);
});
// man.wait();

// Promise写法
const manPromise = new Person();
manPromise.hooks.wait.tapPromise('wait', () => {
  console.log('promise wait 3000');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
});
manPromise.hooks.wait.tapPromise('wait', () => {
  console.log('promise wait 2000');
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('promise执行完成');
    }, 2000);
  });
});
manPromise.waitPromise();
