/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-14 16:50:38
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()
const userService = require('../service/user')

import userInfo from '../public/server/permission'

import { createToken } from '../utils/jwt'

/**
 * 用户登录
 */
userRouter.post('/login', async(request, response, next) => {
  const { username, password } = request.body
  if (!username || !password) {
    return response.send({
      code: '100000',
      msg: '请输入完整信息!'
    })
  }
  try {
    const args = { username, password }
    const { code, data } = await userService.loginHandler(args)
    response.send(code === '000000'
      ? {
        code: '000000',
        data: {
          token: createToken(data)
        },
        msg: '登录成功!'
      }
      : data
    )
  } catch (error) {
    console.log(error)
  }
})

/**
 * 用户注册
 */
userRouter.post('/register', async(request, response, next) => {
  const { username, password } = request.body
  if (!username || !password) {
    return response.send({
      code: '100000',
      msg: '请输入完整信息!'
    })
  }
  try {
    const args = { username, password }
    const { code, data } = await userService.registerHandler(args)
    response.send(code === '000000'
      ? {
        code: '000000',
        data: {
          token: createToken(data)
        },
        msg: '注册成功!'
      }
      : data
    )
  } catch (error) {
    next(error)
  }
})

/**
 * 获取用户信息
 */
userRouter.get('/user/info', (request, response) => {
  response.send({
    code: '000000',
    data: {
      userInfo: userInfo
    },
    message: '获取用户信息成功!'
  })
})
export default userRouter
