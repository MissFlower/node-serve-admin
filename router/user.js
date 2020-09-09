/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-31 14:31:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-09 20:55:50
 */
const express = require('express')
// 创建一个路由容器
const userRouter = express.Router()
const jwt = require('jsonwebtoken')

import userInfo from '../public/server/permission'
import * as user from '../public/server/user'
import { secretOrPrivateKey } from '../config'

userRouter.get('/user/info', (request, response) => {
  console.log(request)
  response.send({
    code: '000000',
    data: {
      userInfo: userInfo
    },
    message: '获取用户信息成功!'
  })
})

userRouter.post('/login', async(request, response, next) => {
  try {
    const { username, password } = request.body
    // 是否存在该用户
    const data = await user.findUser({ username })
    if (data && data.length) {
      const res = data.find(item => item.password === password)
      if (res) {
        response.status(200).send({
          code: '000000',
          data: {
            token: 'Bearer ' + jwt.sign(
              {
                name: res.username,
                _id: res._id
              },
              secretOrPrivateKey,
              {
                expiresIn: 60 * 60 * 1
              }
            )
          },
          msg: '登陆成功!'
        })
      } else {
        response.status(200).send({
          code: '100000',
          data: {},
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
  } catch (error) {
    console.log(error)
    next(error)
  }
})

userRouter.post('/register', async(request, response, next) => {
  try {
    const { username, password } = request.body
    // 是否存在该用户
    const data = await user.findUser({ username })
    if (!data.length) {
      // 用户不存在 进行注册
      const { _id } = await user.createUser({ username, password })
      console.log(_id)
      if (_id) {
        response.send({
          code: '000000',
          data: {
            token: 12345
          },
          msg: '注册成功!'
        })
      } else {
        response.send({
          code: '100000',
          data: {},
          msg: '注册失败!'
        })
      }
    } else {
      response.send({
        code: '100000',
        data: {},
        msg: '用户已存在!'
      })
    }
  } catch (error) {
    console.log(error)
    next(error)
  }
})

export default userRouter
