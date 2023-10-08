const {
  sources: { ReplaceSource },
} = require('webpack');

class HandsomePlugin {
  constructor(options = {}) {
    const { name } = options; // 获取入参
    this.name = name; // 保存入参
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync(this.constructor.name, (compilation, cb) => {
      Object.keys(compilation.assets).forEach((filename) => {
        const asset = compilation.assets[filename]; // 产物
        const assetSource = asset.source(); // 产物内容
        const replaceSource = new ReplaceSource(asset, filename); // 替换源实例
        if (assetSource.indexOf(this.name) > -1) {
          replaceSource.replace(
            assetSource.indexOf(this.name) + this.name.length,
            0,
            ', is handsome'
          );
        }
        compilation.assets[filename] = replaceSource; // 更新产物内容
      });
      cb();
    });
  }
}

module.exports = HandsomePlugin;
