const PLUGIN_NAME = 'InjectPlugin';
const {
  sources: { ConcatSource, RawSource },
} = require('webpack');

class InjectPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.processAssets.tapAsync(PLUGIN_NAME, (assets, cb) => {
        Object.keys(assets).forEach((k) => {
          assets[k] = new ConcatSource(
            new RawSource('// Inject By Gaaming\n\n'),
            assets[k]
          );
        });
        cb();
      });
    });
  }
}

module.exports = InjectPlugin;
