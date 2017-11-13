const router = require('express').Router()
const { Address, Feature, UserFeature } = require('../db/models')
module.exports = router

// to get all the addresses
router.get('/', (req, res, next) => {
  return Address.findAll()
    .then( addresses => {
      res.json(addresses);
    })
    .catch(next);
})

router.get('/user/:id', (req, res, next) => {
  const id = req.params.id
  return Address.findAll({
    where: {userId: id},
    include: [{model: UserFeature, include: [{model: Feature}]}]
  })
    .then(addresses => {
      res.json(addresses);
    })
    .catch(next);
})

// to create a new address and still return all the addresses
router.post('/new', async (req, res, next) => {
  //req.body {address: , lat: , lng: , userId: }
  await Address.create(req.body)
    .then( address => res.json(address))
    .catch(next);
})
