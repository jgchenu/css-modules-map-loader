const Module = require("module");
const mapLoaderModule = new Module("map-loader");
global.allLocals = {};

function creaeteMapKey(key, prefixNames, platform) {
  const arr = [].concat(prefixNames);
  arr.unshift(platform);
  arr.push(key);
  return arr.join("-");
}

function createSrcReg(prefixIndex = 1) {
  let regStr = ".*";
  for (let i = 0; i <= prefixIndex; i++) {
    if (i === prefixIndex) {
      regStr += "\\/\\w+\\.(?:less|sass|css|scss)";
      break;
    }
    regStr += "\\/(\\w+)";
  }
  return new RegExp(regStr);
}

module.exports = function(content) {
  if (
    !content.includes("exports.locals") ||
    !this.resourcePath.includes("style.less")
  ) {
    return content;
  }

  const localsModule = content.split("// Exports")[1];
  mapLoaderModule._compile(localsModule, "map-loader");
  const singleLocals = mapLoaderModule.exports.locals;
  if (!singleLocals) return content;
  const isMobile = this.resourcePath.includes("mobile");
  const platform = isMobile ? "mobile" : "desktop";
  const srcRegExp = createSrcReg(this.query.prefixIndex);
  const prefixNames = srcRegExp.exec(this.resourcePath).slice(1);
  Object.keys(singleLocals).forEach(key => {
    const mapKey = creaeteMapKey(key, prefixNames, platform);
    singleLocals[mapKey] = singleLocals[key];
    delete singleLocals[key];
  });
  Object.assign(global.allLocals, singleLocals);
  return content;
};
