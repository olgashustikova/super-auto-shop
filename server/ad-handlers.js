'use strict'
const { uuid } = require('uuidv4')
const basicAuth = require('basic-auth')
require('dotenv').config()
const express = require('express')
const { response } = require('express')
const MongoClient = require('mongodb').MongoClient
const uri = process.env.Mongo_URI
const client = new MongoClient(uri)

const addAd = async (request, response) => {
  try {
    const credentials = basicAuth(request)

    if (!credentials) {
      return res.status(401).send('Authentication required.')
    }
    client.connect()
    const db = client.db('car-store')
    const collection = db.collection('ads')

    const objectToInsert = {
      _id: uuid(),
      userName: credentials.name,
      make: request.body.make,
      model: request.body.model,
      year: request.body.year,
      price: request.body.price,
      transmission: request.body.transmission,
      kilometres: request.body.kilometres,
      bodyType: request.body.bodyType,
      sellerType: request.body.sellerType,
      imageUrl: request.body.imageUrl,
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

const getAds = async (request, response) => {
  try {
    await client.connect()
    const db = client.db('car-store')
    const adsCollection = db.collection('ads')
    // create mongo query
    let mongoQuery = {}
    // find ads by mongo query
    const ads = await adsCollection.find(mongoQuery).toArray()
    return response
      .status(200)
      .json({ status: 200, data: ads, message: 'All ads' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: 'Internal Server Error' })
  }
}
const getAd = async (request, response) => {
  try {
    await client.connect()
    const db = client.db('car-store')
    const collection = await db.collection('ads')
    const adFromMongo = await collection.findOne({
      _id: request.params.id,
    })
    if (!adFromMongo) {
      return response.status(404).json({ status: 404, message: 'ad not found' })
    }
    return response
      .status(200)
      .json({ status: 200, data: adFromMongo, message: 'success' })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }
}

module.exports = { addAd, getAds, getAd }
