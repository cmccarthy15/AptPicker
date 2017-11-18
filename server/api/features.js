const router = require('express').Router()
const { Feature, UserFeature } = require('../db/models')

const yelpAccessToken = process.env.yelpAccessToken || require('../../secrets').yelpAccessToken
const yelp = require('yelp-fusion');

const yelpClient = yelp.client(yelpAccessToken);

module.exports = router

// to get all the features
router.get('/', (req, res, next) => {
  Feature.findAll()
    .then(features => {
      res.json(features);
    })
    .catch(next);
})


router.get('/user/:id', (req, res, next) => {
  UserFeature.findAll({where: {userId: req.params.id}})
    .then(features => {
      res.json(features);
    })
    .catch(next);
})


router.post('/user/:id/newaddr', async (req, res, next) => {
  let yelpResponses = await Promise.all(
    req.body.options.map(option => yelpClient.search({
      term: option[1],
      latitude: req.body.lat,
      longitude: req.body.lng,
      radius: req.body.radius,
      limit: 3
    })
    .then( response => {
      const businesses = response.jsonBody.businesses;
      const userFeatures = Promise.all(
        businesses.map(({ name, rating, coordinates, price, location, distance, url }) => UserFeature.create({ name, rating, url, lng: coordinates.longitude, lat: coordinates.latitude, price, address: location.display_address[0], distance, userId: req.params.id, addressId: req.body.addressId, featureId: option[0] }))
      )
      return userFeatures;
    })
    )
  )
  .catch(next);
  // await req.body.options.forEach(async option => {
  //   await yelpClient.search({
  //     term: option[1],
  //     latitude: req.body.lat,
  //     longitude: req.body.lng,
  //     radius: req.body.radius,
  //     limit: 3
  //   })
  //     .then(async response => {
  //       const businesses = response.jsonBody.businesses;
  //       const limitedData = await businesses.map(async ({ name, rating, coordinates, price, location, distance, url }) => {
  //         await UserFeature.create({ name, rating, url, lng: coordinates.longitude, lat: coordinates.latitude, price, address: location.display_address[0], distance, userId: req.params.id, addressId: req.body.addressId, featureId: option[0] })
  //       })
  //       // res.json(businesses)
  //     })
  //     .catch(next);
  // })
  console.log('please let this not be promises   ------->   ', yelpResponses)
  res.json(yelpResponses);
})

router.delete('/:id', (req, res, next) => {
  UserFeature.findById(req.params.id)
    .then( feature => {
      feature.destroy();
      res.send('successful delete')
    })
    .catch(next)
})
