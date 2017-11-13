const router = require('express').Router()
const { Feature, UserFeature } = require('../db/models')

const { yelpAccessToken } = require('../../secrets')
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
  console.log('req body has the right stuff? ', req.body); // radius and array of arrays [id, type]
  await req.body.options.forEach(option => {
    return yelpClient.search({
      term: option[1] ,
      latitude: req.body.lat,
      longitude: req.body.lng,
      radius: req.body.radius,
      limit: 5
    })
      .then(async response => {
        const businesses = response.jsonBody.businesses;
        const limitedData = await businesses.map(async ({ name, rating, coordinates, price, location, distance }) => {
          await UserFeature.create({ name, rating, lng: coordinates.longitude, lat: coordinates.latitude, price, address: location.display_address[0], distance, userId: req.params.id, addressId: req.body.addressId, featureId: option[0] })
        })
        // res.json(businesses)
      })
      .catch(next);
  })
  res.send('completed')
})
