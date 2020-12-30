/*
 * @Description: 用户sevice
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-14 15:08:21
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-14 16:41:30
 */
const UserModel = require('../models/user')

class UserService {
  /**
   * 用户账号处理：登录
   * @param {String} username
   * @param {String} password
   */
  async loginHandler({ username, password }) {
    try {
      const userDoc = await UserModel.findOne({ username })
      if (!userDoc) {
        // 用户不存在
        return {
          code: '100000',
          msg: '该用户不存在,请注册后登陆!'
        }
      } else {
        // 登录账号
        const result = await userDoc.comparePassword(password, userDoc.password) // 进行密码比对是否一致
        UserModel.find((err, res) => {
          if (err) {
            console.log('查询失败')
          } else {
            console.log(res)
          }
        })
        return !result
          ? {
            code: '100000',
            msg: '密码输入错误,请重新输入!'
          }
          : {
            code: '000000',
            data: {
              _id: userDoc._id,
              userName: userDoc.userName,
              gender: userDoc.gender,
              avatar: userDoc.avatar,
              mobilePhone: userDoc.mobilePhone,
              email: userDoc.email,
              birthday: userDoc.birthday
            }
          }
      }
    } catch (error) {
      console.log(error)
    }
  }
  /**
   * 用户账号处理：注册
   * @param {String} username
   * @param {String} password
   */
  async registerHandler({ username, password }) {
    try {
      const userDoc = await UserModel.findOne({ username })
      if (userDoc) {
        // 用户已存在
        return {
          code: '100000',
          msg: '该用户已存在,请直接登陆!'
        }
      } else {
        // 注册账号
        const userEntity = new UserModel({ username, password })
        // 保存到数据库中
        const userInfo = await userEntity.save()
        return {
          code: '000000',
          data: {
            _id: userInfo._id,
            userName: userInfo.userName,
            gender: userInfo.gender,
            avatar: userInfo.avatar,
            mobilePhone: userInfo.mobilePhone,
            email: userInfo.email,
            birthday: userInfo.birthday
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = new UserService()
