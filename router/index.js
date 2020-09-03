/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:06:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-31 19:14:59
 */
const express = require('express')
// 创建一个路由容器
const router = express.Router()

router.get('/', (request, response) => {
  response.send('主页')
})

// user 路由
import userRouter from './user'

router.use(userRouter)

module.exports = router
