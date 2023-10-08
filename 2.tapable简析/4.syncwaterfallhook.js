const { SyncWaterfallHook } = require('tapable');

class Person {
  constructor() {
    this.hooks = {
      habits: new SyncWaterfallHook(['这里要有个入参']),
    };
  }

  finalHabit() {
    // 执行回调，如果有参数，则作为第一个注册事件的入参
    return this.hooks.habits.call('sing');
  }
}

const man = new Person();

// 开始学习兴趣
man.hooks.habits.tap('dance', (last) => {
  console.log('上一个habit: ', last);
  return 'dance';
});

man.hooks.habits.tap('rap', (last) => {
  console.log('上一个habit: ', last);
  return 'rap';
});

man.hooks.habits.tap('basketball', (last) => {
  console.log('上一个habits: ', last);
  return 'basketball';
});

console.log('最终的habit: ', man.finalHabit());
