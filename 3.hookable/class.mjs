import { Hookable } from 'hookable';

class Person extends Hookable {
  constructor() {
    super();

    // 构建时注册事件
    this.hook('create', () => {
      console.log('im create');
    });
  }

  addMoreHooks() {
    this.addHooks({
      update: {
        before: () => {
          console.log('im before update');
        },
        after: () => {
          console.log('im after update');
        },
      },
    });
  }
}

const man = new Person();
man.callHook('create');

// 外部注册事件
man.hook('mount', () => {
  console.log('im mount');
});
man.callHook('mount');

// 注册多个事件
man.addMoreHooks();
man.callHook('update:before');
man.callHook('update:after');
