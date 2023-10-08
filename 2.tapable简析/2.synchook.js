const { SyncHook } = require('tapable');

class Person {
  constructor() {
    this.hooks = {
      food: new SyncHook(),
    };
  }

  eat() {
    // 触发回调
    this.hooks.food.call();
  }
}
ß;
const man = new Person();

// 注册回调
man.hooks.food.tap('apple', () => {
  console.log('eat apple');
});

man.hooks.food.tap('orange', () => {
  console.log('eat orange');
});

man.hooks.food.tap('banana', () => {
  console.log('eat banana');
});

man.eat(); // 执行回调
