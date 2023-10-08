class ConsolePlugin {
  apply(compiler) {
    console.log('hhh, im plugin');
  }
}

module.exports = {
  ConsolePlugin,
};
