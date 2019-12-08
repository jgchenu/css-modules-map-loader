const pluginName = "MapLoaderPlugin";
const defaultFilename = "map.json";
// const fs = require("fs");
// const path = require("path");
// const mapFile = `${path.resolve(__dirname, "../public")}/map.json`;

class MapLoaderPlugin {
  constructor(options) {
    this.options = Object.assign({ filename: defaultFilename }, options || {});
  }
  apply(compiler) {
    // 异步钩子
    compiler.hooks.emit.tapAsync(pluginName, (compilation, cb) => {
      const mapSting = JSON.stringify(global.allLocals || {});
      compilation.assets[this.options.filename] = {
        source: function() {
          return mapSting;
        },
        size: function() {
          return mapSting.length;
        }
      };
      cb();
    });
  }
}

module.exports = MapLoaderPlugin;
