/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:06:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-04 17:01:28
 */
// 引入Mongoose包
const mongoose = require('mongoose')
const Schema = mongoose.Schema
// 指定连接的数据库，不需要存在 当插入第一条数据之后 自动会被创建出来
mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})
// 设计集合结构(表结构)
const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  }
})
// 将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为model
// 第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称(mongoose 会自动将大写名词的字符串转为小写复数形式的集合名称)
// 例如这里的User 最终会变为 users 集合名称
//  第二个参数：架构 Schema 就是你设计的表结构
const User = mongoose.model('User', userSchema)

// const user = new User({
//   username: 'WangYanWei',
//   password: '1234567890',
//   email: 'DoveyLoveyCora@163.com'
// })
// 新增
// user.save().then(() => console.log('meow'))
// user.save((err, res) => {
// 	if (err) {
// 		console.log('保存失败')
// 	} else {
// 		console.log('保存成功')
// 		console.log(res)
// 	}
// })

// 查询所有
// User.find((err, res) => {
//   if (err) {
//     console.log('查询失败')
//   } else {
//     console.log(res)
//   }
// })
// 按条件查询
// find拿到的数据放到一个数组里 findOne只查询找到的第一个并返回一个对象 查询不到返回null
// User.find(
// 	{
// 		username: 'WangYanWei'
// 	},
// 	(err, res) => {
// 		if (err) {
// 			console.log('查询失败')
// 		} else {
// 			console.log(res)
// 		}
// })
// 删除
// User.remove({
// 	username: 'WangYanWei'
// }, (err, res) => {
// 	if (err) {
// 		console.log('删除失败')
// 	} else {
// 		console.log('删除成功')
// 		console.log(res)
// 	}
// })
// 更新
// User.findByIdAndUpdate('5f2c0a7b9c2bc914f4762da4', {
// 	password: '147258369'
// }, (err, res) => {
// 	if (err) {
// 		console.log('更新失败')
// 	} else {
// 		console.log('更新成功')
// 		console.log(res)
// 	}
// })

// 创建用户
export function createUser({ username, password, email }) {
  const user = new User({
    username,
    password,
    email
  })
  user.save((err, res) => {
    if (err) {
      res.send({
        code: 500,
        message: '系统错误, 用户创建失败!',
        data: null
      })
    } else {
      res.send({
        code: 200,
        message: '用户创建成功!'
      })
    }
  })
}

// 删除用户
export function deleteUser({ id }) {
  User.remove({ id }, (err, res) => {
    if (err) {
      res.send({
        code: 500,
        message: '系统错误, 用户删除失败!',
        data: null
      })
    } else {
      res.send({
        code: 200,
        message: '用户删除成功!'
      })
    }
  })
}

// 查找用户
export function findUser({ username }) {
  return User.find({ username })
}
// module.exports = USER
// export default USER
