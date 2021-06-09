/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:06:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-31 10:18:21
 */
// 引入express实例
const express = require('express')
// 引入http-errors
const createError = require('http-errors')
// 引入日志模块
const logger = require('morgan')
// post 参数解析
const bodyParser = require('body-parser')
// 导入跨域配置
// const corsConfig = require('./utils/cors')
// 导入数据库连接文件
const connect = require('./utils/connect')
// 引入jwtInstance globalInterception
import { jwtInstance, globalInterception } from './utils/jwt'
// 引入路由
const router = require('./router')

const app = express()

// 加载跨域模块
// app.use(corsConfig)
// 日志
app.use(logger('dev'))

// 访问静态资源目录
app.use('/public', express.static('./public/'))

// 使用post请求
// 解析 application/json
const jsonParser = bodyParser.json()
// 解析 application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser)
app.use(urlencodedParser)

// 使用jwt中间件(实例)
app.use(jwtInstance)

// 使用路由
app.use(router)

// 404 处理 所要未处理的请求路径都会在这里处理
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(globalInterception)

;(async() => {
  await connect() // 执行连接数据库任务
})()

app.listen(5000, () => {
  console.log('express is running ...')
})
