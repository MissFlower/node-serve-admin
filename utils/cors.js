/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-14 14:06:59
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-14 14:09:12
 */
const cors = require('cors')
// 配置跨域模块 允许那个地址跨域访问
module.exports = cors(
  {
    origin: [
      'http://192.168.0.29:5924',
      'http://localhost:5924'
    ],
    withCredentials: true
  }
)
