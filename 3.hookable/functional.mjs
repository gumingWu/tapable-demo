import { createHooks } from 'hookable';

const hooks = createHooks();

// 基础使用
hooks.hook('hello', () => {
  console.log('hi, im hookable');
});
hooks.callHook('hello');

// 注册多个hook
hooks.addHooks({
  eat() {
    console.log('im eating');
  },
  sleep: {
    before() {
      console.log('before sleep');
    },
    after() {
      console.log('after sleep');
    },
  },
});
hooks.callHook('eat');
hooks.callHook('sleep:before');
hooks.callHook('sleep:after');

// 异步回调
hooks.hook('setTimeout', () => {
  setTimeout(() => {
    console.log('wait 2000');
  }, 2000);
});
hooks.hook('async', async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('async 3000');
      resolve();
    }, 3000);
  });
});
hooks.callHook('setTimeout');
hooks.callHook('async');

// 移除hook
function delFunc() {
  console.log('im delFunc');
}
hooks.hook('delete', delFunc);
hooks.callHook('delete');
hooks.removeHook('delete', delFunc);
hooks.callHook('delete'); // 这个会执行，但没结果，也没报错
