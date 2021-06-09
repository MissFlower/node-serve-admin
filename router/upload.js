/*
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-03 11:26:25
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-08 14:01:51
 */
const express = require('express')
// 创建一个路由容器
const uploadRouter = express.Router()

const multiparty = require('multiparty')
const path = require('path')
const fse = require('fs-extra')

const extractExt = filename => filename.slice(filename.lastIndexOf('.'), filename.length) // 提取后缀名
const UPLOAD_DIR = path.resolve(__dirname, '..', 'target') // 大文件存储目录

uploadRouter.post('/upload', async(request, response, next) => {
  const multipart = new multiparty.Form()
  multipart.parse(request, async(err, fields, files) => {
    if (err) {
      return
    }

    const [chunk] = files.chunk
    const [hash] = fields.hash
    const [filename] = fields.filename
    const [fileHash] = fields.fileHash
    const filePath = path.resolve(
      UPLOAD_DIR,
      `${fileHash}${extractExt(filename)}`
    )
    const chunkDir = path.resolve(UPLOAD_DIR, fileHash)

    // 文件存在直接返回
    if (fse.existsSync(filePath)) {
      console.log('文件已存在')
      response.send({
        code: '000000',
        message: 'file exist'
      })
      return
    }

    // 如果切片目录不存在则创建切片目录
    if (!fse.existsSync(chunkDir)) {
      await fse.mkdirs(chunkDir)
    }
    // fs-extra 专用方法，类似 fs.rename 并且跨平台
    // fs-extra 的 rename 方法 windows 平台会有权限问题
    // https://github.com/meteor/meteor/issues/7852#issuecomment-255767835
    // 重命名
    await fse.move(chunk.path, path.resolve(chunkDir, hash))
    response.send({
      code: '000000',
      message: 'received file chunk'
    })
  })
})

uploadRouter.post('/mergeFiles', async(request, response, next) => {
  const { fileHash, filename, size } = request.body
  const ext = extractExt(filename)
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
  await mergeFileChunk(filePath, fileHash, size)
  response.send({
    code: '000000',
    message: 'file merged success'
  })
})

const pipeStream = (path, writeStream) => {
  return new Promise(resolve => {
    const readStream = fse.createReadStream(path)
    readStream.on('end', () => {
      // 同步删除文件
      fse.unlinkSync(path)
      resolve()
    })
    readStream.pipe(writeStream)
  })
}
// 合并切片
const mergeFileChunk = async(filePath, fileHash, size) => {
  const chunkDir = path.resolve(UPLOAD_DIR, fileHash)
  const chunkPaths = await fse.readdir(chunkDir)
  // 根据切片下标进行排序
  // 否则直接读取目录的获得的顺序可能会错乱
  chunkPaths.sort((a, b) => a.split('-')[1] - b.split('-')[1])
  await Promise.all(
    chunkPaths.map((chunkPath, index) => pipeStream(
      path.resolve(chunkDir, chunkPath),
      // 指定位置创建可写流
      fse.createWriteStream(filePath, {
        start: index * size,
        end: (index + 1) * size
      })
    ))
  )
  console.log('删除保存切片的目录')
  fse.rmdirSync(chunkDir) // 合并后删除保存切片的目录
}

// 返回已经上传切片名
const createUploadedList = async fileHash =>
  fse.existsSync(path.resolve(UPLOAD_DIR, fileHash))
    ? await fse.readdir(path.resolve(UPLOAD_DIR, fileHash))
    : []

uploadRouter.post('/verify', async(request, response, next) => {
  console.log(request.body)
  const { filename, fileHash } = request.body
  const ext = extractExt(filename)
  const filePath = path.resolve(UPLOAD_DIR, `${fileHash}${ext}`)
  if (fse.existsSync(filePath)) {
    response.send({
      code: '000000',
      data: {
        shouldUpload: false
      },
      msg: 'file is exist'
    })
  } else {
    response.send({
      code: '000000',
      data: {
        shouldUpload: true,
        uploadedList: await createUploadedList(fileHash)
      },
      msg: 'file is not exist'
    })
  }
})

export default uploadRouter
