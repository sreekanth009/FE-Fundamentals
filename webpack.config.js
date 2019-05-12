const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: {
    index: './src/index.js',
  },
  devServer: {
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: '!eslint-loader!babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: true,
      chunks: ['index'],
      filename: 'index.html'
    })
  ]
}