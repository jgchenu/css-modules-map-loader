const webpack = require("webpack");
const config = require("./webpack.client");
const compile = webpack(config);
compile.run();
