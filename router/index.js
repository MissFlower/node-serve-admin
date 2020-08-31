/*
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:06:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-31 19:14:59
 */
import userRouter from './user'
const express = require('express')
// 创建一个路由容器
const router = express.Router()

router.get('/', (request, response) => {
  response.send('主页')
})

module.exports = Object.assign(router, userRouter)
console.log(Object.assign(router, userRouter))
