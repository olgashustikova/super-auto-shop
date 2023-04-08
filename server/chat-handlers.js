'use strict'
const { uuid } = require('uuidv4')
const basicAuth = require('basic-auth')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uri = process.env.Mongo_URI
const client = new MongoClient(uri)

const addChat = async (request, response) => {
  console.log(request.body)
  try {
    const credentials = basicAuth(request)

    if (!credentials) {
      return res.status(401).send('Authentication required.')
    }
    client.connect()
    const db = client.db('car-store')
    const collection = db.collection('chat')

    const objectToInsert = {
      _id: uuid(),
      to: request.body.to,
      from: request.body.from,
      text: request.body.text,
    }
    await collection.insertOne(objectToInsert)
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }

  return response.status(200).json({ status: 200, message: 'ok' })
}

const getAllChatPersonsForUser = async (request, response) => {
  const credentials = basicAuth(request)

  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('chat')
    const chatsFromMongo = await collection.distinct('from', {
      to: credentials.name,
    })
    if (!chatsFromMongo) {
      return response
        .status(404)
        .json({ status: 404, message: 'chat not found' })
    }
    return response
      .status(200)
      .json({ status: 200, data: chatsFromMongo, message: 'success' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }
}

const getChat = async (request, response) => {
  const credentials = basicAuth(request)
  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('chat')
    const chatFromMongo = await collection
      .find({
        to: credentials.name,
        from: request.query.from,
      })
      .toArray()
    if (!chatFromMongo) {
      return response
        .status(404)
        .json({ status: 404, message: 'chat not found' })
    }
    return response
      .status(200)
      .json({ status: 200, data: chatFromMongo, message: 'success' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }
}

module.exports = { addChat, getChat, getAllChatPersonsForUser }
