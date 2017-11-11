const router = require('express').Router()
const { Address } = require('../db/models')
module.exports = router

// to get all the addresses
router.get('/', (req, res, next) => {
  Address.findAll()
    .then( addresses => {
      res.json(addresses);
    })
    .catch(next);
})

router.get('/user/:id', (req, res, next) => {
  const id = req.params.id
  Address.findAll({where: {userId: id}})
    .then(addresses => {
      res.json(addresses);
    })
    .catch(next);
})

// to create a new address and still return all the addresses
router.post('/new', async (req, res, next) => {
  //req.body {address: , lat: , lng: , userId: }
  await Address.create(req.body)
    .catch(next);
  res.send('created address');
})
