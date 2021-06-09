/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-14 11:16:22
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-11-05 14:31:45
 */

const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')

// 撒盐：加密的时候混淆 | 密钥
const secret = 'DoveyLoveyCora'

/**
 * 创建 Token
 */
export const createToken = (userInfo) => {
  // JWT 格式 token | 有效时间 1 小时
  return 'Bearer ' + jwt.sign(
    { userInfo },
    secret,
    { expiresIn: '1h' }
  )
}

export const jwtInstance = expressJWT({
  secret: secret,
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
})

export const globalInterception = (err, req, res, next) => {
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
    error.message = '无效令牌,请重新登录!'
    return res.status(401).json(error)
  }

  // default to 500 server error
  error.code = '500'
  error.message = '服务器内部故障!'
  return res.status(500).json(error)
}

