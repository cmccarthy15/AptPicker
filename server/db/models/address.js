const { STRING, DECIMAL } = require('sequelize')
const db = require('../db')

const Address = db.define('address', {
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
  }
})

module.exports = Address
