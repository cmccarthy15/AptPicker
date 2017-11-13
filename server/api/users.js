const router = require('express').Router()
const {User, Feature} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})

router.put('/:id', (req, res, next) => {
  console.log('inside of the router: ', req.body, req.params.id)
  return User.findById(req.params.id)
    .then( user => {
      console.log(user);
      user.update({radius: req.body.radius})
        .then( newUser => res.json(newUser))
    })
    .catch(next)
})

router.put('/interests/:id', (req, res, next) => {
  console.log('inside of the interests router: ', req.body, req.params.id)
  User.findById(req.params.id)
    .then(async user => {
      console.log(user);
      await user.setFeatures([...req.body.options])
      res.json(user);
    })
    .catch(next)
})
