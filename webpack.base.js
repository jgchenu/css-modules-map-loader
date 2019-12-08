const env = process.env.NODE_ENV || "development";
module.exports = {
  mode: env,
  module: {
    rules: [
      {
        test: /.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};
