const router = require('express').Router()
const User = require('../db/models/user')
const Feature = require('../db/models/feature')
module.exports = router

router.post('/login', (req, res, next) => {
  const {password, email} = req.body
  User.findOne({where: {email: email}})
    .then(user => {
      if (!user) {
        res.status(401).send('User not found')
      } else if (!user.correctPassword(password)) {
        res.status(401).send('Incorrect password')
      } else {
        User.findOne({
          where: { email: email },
          attributes: ['id', 'email', 'name', 'radius'],
          include: [{ model: Feature, through: 'userInterests' }]
        })
      .then(someUser => {
        req.login(someUser, err => (err ? next(err) : res.json(someUser)))})
      }
    })
    .catch(next)
})

router.post('/signup', (req, res, next) => {
  User.create(req.body)
    .then( (user) => {
      User.findOne({
        where: { id: user.id },
        attributes: ['id', 'email', 'name', 'radius'],
        include: [{ model: Feature, through: 'userInterests' }]
      })
      .then(someUser => req.login(someUser, err => (err ? next(err) : res.json(someUser))))
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        res.status(401).send('User already exists')
      } else {
        next(err)
      }
    })
})

router.post('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/me', (req, res, next) => {
  User.findById(req.user.id)
    .then(user => {
      req.user = user;
      res.json(user)})
    .catch(next)

  //res.json(req.user)
})

router.use('/google', require('./google'))
