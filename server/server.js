const express = require('express')
const { addUser, getUser, loginUser } = require('./user-handlers')

express()
  .use(express.json())
  .get('/test', (req, res) => {
    res.status(200).json({ data: 'test' })
  })
  .post('/api/add-user', addUser)
  .get('/api/get-user/:email', getUser)
  .post('/api/login-user', loginUser)
  .listen(4000, () => {
    console.log('Server started on port 4000')
  })
