const express = require('express')
const { addAd, getAds, getAd } = require('./ad-handlers')

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
  .post('/api/add-ad', userBasicAuthCheck, addAd)
  .get('/api/get-ads', getAds)
  .get('/api/get-ad/:id', getAd)
  .listen(4000, () => {
    console.log('Server started on port 4000')
  })
