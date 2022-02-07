const { sequelize } = require('sequelize')

const sequelize = new sequelize('nodesequelize', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
})

//try {

//  sequelize.authenticate()
//  console.log('conectamos com sucesso com o sequelize')

//} catch (err) {
//  console.log('Nao foi possível conectar:', error)
//}

module.exports = sequelize