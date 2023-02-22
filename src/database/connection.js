const { Sequelize } = require('sequelize')
const { db } = require('../config/config')

const connection = new Sequelize({
    dialect:'postgres',
    host: db.host,
    username: db.username,
    password: db.password,
    database: db.dbName
})

module.exports = connection