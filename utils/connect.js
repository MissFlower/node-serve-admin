/*
 * @Description: 连接数据库
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-14 14:16:36
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-14 15:59:08
 */
const mongoose = require('mongoose')
const db = 'mongodb://localhost/test' // 服务器本地临时部署数据库

mongoose.set('useCreateIndex', true)

// 导出一个方法
const connect = () => {
  // 连接数据库
  mongoose.connect(
    db,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  // 记录数据库连接的次数
  let maxConnectTimes = 0

  return new Promise((resolve, reject) => {
    // 连接成功操作
    mongoose.connection.once('open', () => {
      console.log('Mongodb 数据库连接成功.')
      resolve()
    })
    // 连接断开操作
    mongoose.connection.on('disconnected', () => {
      console.log('*********** 数据库断开 ***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(new Error('数据库连接失败'))
        throw new Error('数据库连接失败')
      }
    })
    // 连接失败操作
    mongoose.connection.on('error', error => {
      console.log('*********** 数据库错误 ***********')
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject(error)
        throw new Error('数据库连接失败')
      }
    })
  })
}

module.exports = connect
