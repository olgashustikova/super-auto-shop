'use strict'
const { uuid } = require('uuidv4')
const basicAuth = require('basic-auth')
require('dotenv').config()
var crypto = require('crypto')
const express = require('express')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
const uri = process.env.Mongo_URI
const client = new MongoClient(uri)

const addUser = async (request, response) => {
  try {
    console.log(request.body)
    client.connect()
    const db = client.db('car-store')
    const collection = db.collection('users')
    const userFromMongo = await collection.findOne({
      email: request.body.email,
    })
    if (userFromMongo) {
      return response.status(500).json({
        status: 500,
        message: `User with email: ${request.body.email} already exists`,
      })
    }
    const objectToInsert = {
      _id: uuid(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: crypto
        .createHash('md5')
        .update(request.body.password)
        .digest('hex'),
    }
    await collection.insertOne(objectToInsert)
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }
  console.log(request.body)
  return response.status(200).json({ status: 200, message: 'ok' })
}

const getUser = async (request, response) => {
  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('users')
    const userFromMongo = await collection.findOne({
      email: request.params.email,
    })
    if (!userFromMongo) {
      return response
        .status(404)
        .json({ status: 404, message: 'email not found' })
    }
    return response
      .status(200)
      .json({ status: 200, data: userFromMongo, message: 'success' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }
}

const loginUser = async (request, response) => {
  return response.status(200).json({ status: 200, message: 'success' })
}

const userBasicAuthCheck = async (req, res, next) => {
  const credentials = basicAuth(req)
  console.log(`user: ${credentials.name} passing through auth`)
  const hashedPassword = crypto
    .createHash('md5')
    .update(credentials.pass)
    .digest('hex')

  if (!credentials) {
    return res.status(401).send('Authentication required.')
  }
  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('users')
    const userFromMongo = await collection.findOne({
      email: credentials.name,
    })
    if (userFromMongo && hashedPassword === userFromMongo.password) {
      next()
    } else {
      return res
        .status(401)
        .json({ status: 401, error: 'Authentication required' })
    }
  } catch (err) {
    return res.status(500).json({ status: 404, error: err })
  }
}
module.exports = { addUser, getUser, loginUser, userBasicAuthCheck }
