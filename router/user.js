/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: DoveyLoveyCora
 * @LastEditTime: 2020-09-04 00:36:03
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
  const { username } = request.body
  const data = await user.findUser({ username })
  if (data.length) {
    response.status(200).send({
      returnStatus: 'Success',
      data: {
        token: 123456
      },
      returnMsg: '登陆成功'
    })
  }
})

export default userRouter
