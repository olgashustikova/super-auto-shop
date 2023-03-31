'use strict'
const { uuid } = require('uuidv4')
require('dotenv').config()
const express = require('express')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
const uri = process.env.Mongo_URI
const client = new MongoClient(uri)

const addUser = async (request, response) => {
  try {
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
      password: request.body.password,
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
  //   console.log(request.body)
  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('users')
    const userFromMongo = await collection.findOne({
      email: request.body.email,
    })
    if (!userFromMongo) {
      return response.status(404).json({ status: 404, error: 'user not found' })
    }
    if (userFromMongo.password !== request.body.password) {
      return response
        .status(404)
        .json({ status: 404, error: 'incorrect password' })
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
module.exports = { addUser, getUser, loginUser }
