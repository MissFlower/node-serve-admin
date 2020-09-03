/*
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 16:32:43
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()

import userInfo from '../public/server/permission'
// import * as user from '../public/server/user'

userRouter.get('/user/info', (request, response) => {
  response.send(JSON.stringify(userInfo))
})

userRouter.post('/login', (request, response) => {
  console.log('进入login接口')
  // user.findUser()
})

export default userRouter
