const { STRING } = require('sequelize')
const db = require('../db')

const Feature = db.define('feature', {
  type: {
    type: STRING,
    allowNull: false
  },
  icon: {
    type: STRING,
    allowNull: false
  }
})

module.exports = Feature
