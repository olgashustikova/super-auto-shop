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

const opencage = require('opencage-api-client')

// general check if address is fine by using opencage API
// if opencage API can find results, the address is acceptable
const verifyAddress = (address) => {
  const requestObj = {
    q: address,
    key: process.env.OPENCAGE_KEY,
  }
  return opencage
    .geocode(requestObj)
    .then((data) => {
      if (!data.results || data.results.length === 0) {
        return false
      } else {
        return true
      }
    })
    .catch((error) => {
      return false
    })
}

// user signup
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
        error: `User with email: ${request.body.email} already exists`,
      })
    }

    if (!(await verifyAddress(request.body.address))) {
      return response.status(500).json({
        status: 500,
        error: `Address does not exists: ${request.body.address}`,
      })
    }

    const objectToInsert = {
      _id: uuid(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      address: request.body.address,
      password: crypto
        .createHash('md5')
        .update(request.body.password)
        .digest('hex'), // save password as hash
    }
    await collection.insertOne(objectToInsert)
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, error: `Internal Server Error: ${err}` })
  }
  console.log(request.body)
  return response.status(200).json({ status: 200, message: 'ok' })
}

// find a user by username
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
        .json({ status: 404, error: 'email not found' })
    }
    return response
      .status(200)
      .json({ status: 200, data: userFromMongo, message: 'success' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, error: `Internal Server Error: ${err}` })
  }
}

// login user if endpoint returns 200 the user can login
// this method goes after userBasicAuthCheck - wich could return a error
const loginUser = async (request, response) => {
  return response.status(200).json({ status: 200, message: 'success' })
}

// check basic auth, that endpoint goes before all endpoints which are required auth
// it takes creds from header and tries to find user in the database
// and compare passwords
const userBasicAuthCheck = async (req, res, next) => {
  const credentials = basicAuth(req) // get creds from header
  console.log(`user: ${credentials.name} passing through auth`)
  const hashedPassword = crypto
    .createHash('md5')
    .update(credentials.pass)
    .digest('hex') // convert password to hash

  if (!credentials) {
    return res
      .status(401)
      .json({ status: 401, error: 'Authentication required.' })
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
