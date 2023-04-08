const express = require('express')
const { addAd, getAds, getAd } = require('./ad-handlers')
const {
  addChat,
  getChat,
  getAllChatPersonsForUser,
} = require('./chat-handlers')
const os = require('node:os')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  },
})
const upload = multer({ storage: storage })

const {
  addUser,
  getUser,
  loginUser,
  userBasicAuthCheck,
} = require('./user-handlers')

express()
  .use(express.json())
  .post('/api/add-user', addUser)
  .get('/api/get-user/:email', userBasicAuthCheck, getUser)
  .get('/api/login-user', userBasicAuthCheck, loginUser)
  //.post('/api/add-ad', userBasicAuthCheck, multer, addAd)
  .post('/api/add-ad', userBasicAuthCheck, upload.single('image'), addAd)
  .get('/api/get-ads', getAds)
  .get('/api/get-ad/:id', getAd)
  .post('/api/add-chat', userBasicAuthCheck, addChat)
  .get('/api/get-chats', userBasicAuthCheck, getChat)
  .get('/api/get-chats-persons', userBasicAuthCheck, getAllChatPersonsForUser)
  .listen(4000, () => {
    console.log('Server started on port 4000')
  })
