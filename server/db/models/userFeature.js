const { STRING, DECIMAL, INTEGER } = require('sequelize')
const db = require('../db')
const Feature = require('./feature')


const UserFeature = db.define('UserFeature', {
  name: {
    type: STRING,
    allowNull: false
  },
  address: {
    type: STRING,
    allowNull: false
  },
  lat: {
    type: DECIMAL,
    allowNull: false
  },
  lng: {
    type: DECIMAL,
    allowNull: false
  },
  rating: {
    type: INTEGER,
  },
  url: {
    type: STRING,
  },
  distance: {
    type: DECIMAL,
  }
}, {
  defaultScope: {
    include: [{model: Feature, attributes: ['icon', 'type']}]
  }
})

module.exports = UserFeature


// YELP BUSINESS SEARCH API
// returns rating, name, coordinates, image_url, distance sooo muchhhhh stufffff :) :) :) :)
