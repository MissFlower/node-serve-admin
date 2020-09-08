/*
 * @Descripttion:
 * @version:
 * @Author: DoveyLoveyCora
 * @Date: 2020-07-20 20:30:00
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 18:04:25
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

// post 参数解析
const bodyParser = require('body-parser')
// 解析 application/json
const jsonParser = bodyParser.json()
// 解析 application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)

// 引入express-jwt
// const expressJWT = require('express-jwt')
//
// const secretOrPrivateKey = 'hello  BigManing' // 加密token 校验token时要使用
// app.use(expressJWT({
//   secret: secretOrPrivateKey,
//   algorithms: ['HS256']
// }).unless({
//   path: ['/getToken'] // 除了这个地址，其他的URL都需要验证
// }))

app.use(router)

// 404 处理 所要未处理的请求路径都会在这里处理
app.use(function(req, res) {
  res.send('404暂无页面')
})

app.listen(4000, () => {
  console.log('express is running ...')
})
