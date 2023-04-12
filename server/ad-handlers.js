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

// add new add the file is saving to the cloudinary
const addAd = async (request, response) => {
  console.log(`Adding ad, request body:`)
  console.log(request.body)
  console.log(`request file:`)
  console.log(request.file)
  try {
    // wait cloudinary resilt
    const res = await cloudinary.uploader
      .upload(request.file.path, {
        public_id: uuid(),
      })
      .then()
    console.log(`saved image result:`)
    console.log(res)
    // get credentials so we put in mongo username who created the ad
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
      year: parseInt(request.body.year),
      price: parseInt(request.body.price),
      description: request.body.description,
      transmission: request.body.transmission,
      kilometres: parseInt(request.body.kilometres),
      bodyType: request.body.bodyType,
      sellerType: request.body.sellerType,
      imageUrl: res.url, // save cloudinary URL
      imagePublicId: res.public_id, // save cloudinary public id for deletion
    }
    await collection.insertOne(objectToInsert)
  } catch (err) {
    return response
      .status(500)
      .json({ status: 500, message: `Internal Server Error: ${err}` })
  }

  return response.status(200).json({ status: 200, message: 'ok' })
}

// get multiple ads by parameters
// parameters: make, maxPrise, minPrise, maxKm, page
const getAds = async (request, response) => {
  try {
    // maximume ads per respnose
    const maxAdsToRreturn = 8
    await client.connect()
    const db = client.db('car-store')
    const adsCollection = db.collection('ads')
    // create mongo query and adding parameters if they present
    let mongoQuery = {}
    if (request.query.make) {
      mongoQuery.make = request.query.make
    }
    if (request.query.maxPrise) {
      if (!mongoQuery.price) {
        mongoQuery.price = { $lte: parseInt(request.query.maxPrise) }
      } else {
        mongoQuery.price['$lte'] = parseInt(request.query.maxPrise)
      }
    }
    if (request.query.minPrise) {
      if (!mongoQuery.price) {
        mongoQuery.price = { $gte: parseInt(request.query.minPrise) }
      } else {
        mongoQuery.price['$gte'] = parseInt(request.query.minPrise)
      }
    }
    if (request.query.maxKm) {
      mongoQuery.price = { $gte: parseInt(request.query.minPrise) }
    }
    if (request.query.bodyType) {
      mongoQuery.bodyType = request.query.bodyType
    }

    // process page
    let page = 1
    if (request.query.page) {
      if (isNaN(parseInt(request.query.pag)) || page < 1) {
        page = 1
      }
      page = request.query.page
    }
    // the number ads to skip
    const skipAds = (page - 1) * maxAdsToRreturn

    console.log(
      `perform ads search with mongo query: ${JSON.stringify(mongoQuery)}`
    )
    // find ads by mongo query
    const ads = await adsCollection
      .find(mongoQuery)
      .skip(skipAds)
      .limit(maxAdsToRreturn)
      .toArray()
    // ad total ads to have total pages on front-end
    const adsTotal = await adsCollection.countDocuments(mongoQuery)
    return response.status(200).json({
      status: 200,
      data: ads,
      message: 'All ads',
      totalPages: Math.floor(adsTotal / maxAdsToRreturn) + 1,
    })
  } catch (err) {
    console.error(err)
    return response
      .status(500)
      .json({ status: 500, message: 'Internal Server Error' })
  }
}

// get ad by ID
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

// deletge Ad by Id
const deleteAd = async (request, response) => {
  console.log('delete ad:')
  console.log(request.params.id)
  const credentials = basicAuth(request)
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
