const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('./User')

const Address = db.define('Address', {

  street: {
    Type: DataTypes.STRING,
    required: true,
  },
  number: {
    Type: DataTypes.STRING,
    required: true,
  },
  city: {
    Type: DataTypes.STRING,
    required: true,
  },
})

User.hasMany(Address)
Address.belongsTo(User)

module.exports = Address