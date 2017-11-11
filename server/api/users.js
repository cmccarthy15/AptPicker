const router = require('express').Router()
const {User, Feature} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next)
})
