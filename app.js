const createError = require('http-errors')
const logger = require('morgan')
// 引入express-jwt
const expressJWT = require('express-jwt')
// post 参数解析
const bodyParser = require('body-parser')
const express = require('express')
const router = require('./router')

const app = express()

// 引入Mongoose包
const mongoose = require('mongoose')
// 指定连接的数据库，不需要存在 当插入第一条数据之后 自动会被创建出来
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

import { secretOrPrivateKey } from './config'

// 加载跨域模块
// const cors = require('cors')
// // 配置跨域模块 允许那个地址跨域访问
// app.use(cors(
//   {
//     origin: ['http://192.168.0.29:5924',
//       'http://localhost:5924'],
//     withCredentials: true
//   }))

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

// 校验token，获取headers⾥里里的Authorization的token，要写在路由加载之前，静态资源之后
app.use(expressJWT({
  secret: secretOrPrivateKey,
  algorithms: ['HS256'],
  // 自定义token名称时使用 但 返回客户端的token 不要带 'Bearer '
  // getToken: function fromHeaderOrQuerystring(req) {
  //   console.log(req.headers.tk)
  //   if (req.headers.tk) {
  //     return req.headers.tk
  //   } else if (req.query && req.query.token) {
  //     return req.query.token
  //   }

  //   return null
  // },
  requestProperty: 'auth' // 默认解析结果会赋值在 req.user，也可以通过 requestProperty 来修改
}).unless({
  path: ['/login', '/register'] // 除了这个地址，其他的URL都需要验证
}))

// 使用路由
app.use(router)

// 404 处理 所要未处理的请求路径都会在这里处理
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
  const error = {
    code: '',
    message: ''
  }

  if (typeof (err) === 'string') {
    error.code = '100009'
    error.message = err
    return res.status(400).json(error)
  }

  if (err.name === 'UnauthorizedError') {
    error.code = '401'
    error.message = 'Invalid Token'
    return res.status(401).json(error)
  }

  // default to 500 server error
  error.code = '500'
  error.message = 'Internal Server Error'
  return res.status(500).json(error)
})

app.listen(4000, () => {
  console.log('express is running ...')
})
