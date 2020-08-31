/*
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:38:15
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-31 18:38:25
 */
const path = require('path')

function resolve(dir) {
  path.resolve(__dirname, dir)
}

module.exports = {
  target: 'node',
  entry: './app.js',
  output: {
    filename: 'main.js',
    path: resolve('dist')
  },
  module: {
    rules: [// 设置处理js文件的loader
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
}
