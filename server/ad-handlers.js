'use strict'
const { uuid } = require('uuidv4')
const basicAuth = require('basic-auth')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient
const uri = process.env.Mongo_URI
const client = new MongoClient(uri)

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
})

const addAd = async (request, response) => {
  console.log(`Adding ad, request body:`)
  console.log(request.body)
  console.log(`request file:`)
  console.log(request.file)
  const res = await cloudinary.uploader
    .upload(request.file.path, {
      public_id: uuid(),
    })
    .then()
  console.log(`saved image result:`)
  console.log(res)
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
      imageUrl: res.url,
      imagePublicId: res.public_id,
    }
    await collection.insertOne(objectToInsert)
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }

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

const deleteAd = async (request, response) => {
  console.log('delete ad:')
  console.log(request.params.id)
  const credentials = basicAuth(request)

  if (!credentials) {
    return res.status(401).send('Authentication required.')
  }

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
    if (adFromMongo.userName !== credentials.name) {
      return res.status(401).send('no ad found for user')
    }
    console.log('delete from db')
    await collection.deleteOne({
      _id: request.params.id,
    })
    console.log('delete image from cloud')
    const res = await cloudinary.uploader
      .destroy(adFromMongo.imagePublicId)
      .then()
    console.log(`delete image result:`)
    console.log(res)
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

module.exports = { addAd, getAds, getAd, deleteAd }
