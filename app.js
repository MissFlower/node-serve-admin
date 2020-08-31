/*
 * @Descripttion:
 * @version:
 * @Author: DoveyLoveyCora
 * @Date: 2020-07-20 20:30:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-31 19:10:34
 */
const express = require('express')
const router = require('./router')

const app = express()

// 加载跨域模块
// const cors = require('cors')
// 配置跨域模块 允许那个地址跨域访问
// app.use(cors(
//   {
// 		origin:['http://192.168.124.37:8080',
// 		'http://localhost:8080'],
// 		credentials:true
// }))

app.use('/public', express.static('./public/'))

app.use(router)

// 404 处理 所要未处理的请求路径都会在这里处理
app.use(function(req, res) {
  res.send('404暂无页面')
})

// const User = require('./public/server/user')

// app.use(User)

app.listen(3000, () => {
  console.log('express is running ...')
})
