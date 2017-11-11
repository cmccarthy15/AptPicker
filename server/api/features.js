const router = require('express').Router()
const { Feature } = require('../db/models')
module.exports = router

// to get all the features
router.get('/', (req, res, next) => {
  Feature.findAll()
    .then(features => {
      res.json(features);
    })
    .catch(next);
})

