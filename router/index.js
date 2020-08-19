const express = require('express')
// 创建一个路由容器
const router = express.Router()

const userInfo = require('../public/server/permission')
console.log(userInfo)

router.get('/user/info', (request, response) => {
	console.log('userInfo')
	response.send(JSON.stringify(userInfo))
})

router.get('/a', (req, res) => {
	res.send('进入a接口')
})

router.get('/b', (req, res) => {
	res.send('进入b接口');
})

module.exports = router