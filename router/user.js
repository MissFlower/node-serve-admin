/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-04 18:40:12
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()

import userInfo from '../public/server/permission'
import * as user from '../public/server/user'

userRouter.get('/user/info', (request, response) => {
  response.send(JSON.stringify(userInfo))
})

userRouter.post('/login', async(request, response) => {
  const { username, password } = request.body
  // 是否存在该用户
  const data = await user.findUser({ username })
  if (data.length) {
    const res = data.find(item => item.password === password)
    if (res) {
      response.status(200).send({
        code: '000000',
        data: {
          token: 123456
        },
        msg: '登陆成功!'
      })
    } else {
      response.status(200).send({
        code: '000000',
        data: {
          token: 123456
        },
        msg: '用户名或密码错误!'
      })
    }
  } else {
    response.status(200).send({
      code: '000000',
      data: {
        token: 123456
      },
      msg: '用户不存在!'
    })
  }
})

export default userRouter
