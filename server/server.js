const express = require('express')

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
  .listen(4000, () => {
    console.log('Server started on port 4000')
  })
