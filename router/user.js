/*
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-31 19:10:54
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()

import userInfo from '../public/server/permission'

userRouter.get('/user/info', (request, response) => {
  response.send(JSON.stringify(userInfo))
})

export default userRouter
