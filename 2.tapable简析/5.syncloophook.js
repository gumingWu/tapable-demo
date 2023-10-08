const { SyncLoopHook } = require('tapable');

function random() {
  const num = Math.random();
  return num <= 0.5 ? undefined : num;
}

class Person {
  constructor() {
    this.hooks = {
      game: new SyncLoopHook(),
    };
  }

  play() {
    return this.hooks.game.call();
  }
}

const man = new Person();

man.hooks.game.tap('game', () => {
  const num = random();
  console.log('第一个游戏: ', num);
  return num;
});

man.hooks.game.tap('game', () => {
  const num = random();
  console.log('第二个游戏: ', num);
  return num;
});

man.hooks.game.tap('game', () => {
  const num = random();
  console.log('第三个游戏: ', num);
  return num;
});

console.log(man.play());
