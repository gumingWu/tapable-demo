const { SyncBailHook } = require('tapable');

function random() {
  const num = Math.random();
  return num >= 0.5 ? undefined : num;
}

class Person {
  constructor() {
    this.hooks = {
      sleep: new SyncBailHook(),
    };
  }

  sleep() {
    return this.hooks.sleep.call();
  }
}

const man = new Person();

man.hooks.sleep.tap('time', () => {
  console.log('time1 sleep');
  return random();
});

man.hooks.sleep.tap('time', () => {
  console.log('time2 sleep');
  return random();
});

man.hooks.sleep.tap('time', () => {
  console.log('time3 sleep');
  return random();
});

const sleepTime = man.sleep();
console.log(!sleepTime ? '睡了个好觉' : 'no!不够睡:' + sleepTime);
