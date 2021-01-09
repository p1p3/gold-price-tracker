const path = require('path');
const EsmWebpackPlugin = require("@purtuga/esm-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.css|\.s(c|a)ss$/,
      //   use: [{
      //     loader: 'lit-scss-loader',
      //     options: {
      //       minify: true, // defaults to false
      //     },
      //   }, 'extract-loader', 'css-loader', 'sass-loader'],
      // }
      {
        test: /\.s[ac]ss$/i,
        use: [
          'to-string-loader',
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  // output: {
  //   // Define the package name
  //   library: 'GT',
  //   libraryTarget: 'umd',
  //   globalObject: 'this',
  //   filename: 'bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  output: {
    library: 'LIB',
    libraryTarget: 'var',
  },
plugins: [new EsmWebpackPlugin()],
};
