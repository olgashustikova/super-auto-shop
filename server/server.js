const express = require('express')

const { addAd, getAds, getAd, deleteAd } = require('./ad-handlers')
const {
  addChatMessage,
  getChat,
  getAllChatPersonsForUser,
} = require('./chat-handlers')
const {
  addUser,
  getUser,
  loginUser,
  userBasicAuthCheck,
} = require('./user-handlers')

// configuration for saving files
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
// -------------------------------------------

express()
  .use(express.json())
  .post('/api/add-user', addUser)
  .get('/api/get-user/:email', userBasicAuthCheck, getUser)
  .get('/api/login-user', userBasicAuthCheck, loginUser)
  .post('/api/add-ad', userBasicAuthCheck, upload.single('image'), addAd)
  .get('/api/get-ads', getAds)
  .get('/api/get-ad/:id', getAd)
  .delete('/api/delete-ad/:id', userBasicAuthCheck, deleteAd)
  .post('/api/add-chat', userBasicAuthCheck, addChatMessage)
  .get('/api/get-chat', userBasicAuthCheck, getChat)
  .get('/api/get-chats-persons', userBasicAuthCheck, getAllChatPersonsForUser)

  .listen(4000, () => {
    console.log('Server started on port 4000')
  })
