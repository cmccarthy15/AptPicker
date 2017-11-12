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


router.post('/user/:id/newaddr', (req, res, next) => {
  console.log('req has the right stuff? ', req.lat, req.lng, req.body);
    yelpClient.search({
      term: 'coffee',
      latitude: req.body.lat,
      longitude: req.body.lng,
      radius: 800,
      limit: 5
    })
    .then(async response => {
      const businesses = response.jsonBody.businesses;
      const limitedData = await businesses.map(async ({ name, rating, coordinates, price, location, distance}) => {
        await UserFeature.create({ name, rating, lng: coordinates.longitude, lat: coordinates.latitude, price, address: location.display_address[0], distance, userId: req.params.id })
      })
      res.json(businesses)
    })
    .catch(next);
})
