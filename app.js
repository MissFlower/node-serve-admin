/*
 * @Descripttion: 
 * @version: 
 * @Author: DoveyLoveyCora
 * @Date: 2020-07-20 20:30:00
 * @LastEditors: DoveyLoveyCora
 * @LastEditTime: 2020-08-18 22:20:14
 */
const express = require('express')
const router = require('./router')

const app = express()

//加载跨域模块
const cors = require('cors')
//配置跨域模块；允许那个地址跨域访问
// app.use(cors(
//   {
// 		origin:['http://192.168.124.37:8080',
// 		'http://localhost:8080'],
// 		credentials:true
// }))

app.use('/public', express.static('./public/'))

app.use(router)


// const User = require('./public/server/user')

// app.use(User)

app.listen(3000, () => {
	console.log('express is running ...')
})