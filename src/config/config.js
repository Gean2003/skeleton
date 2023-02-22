require('dotenv').config()

const enviromments = {
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET,
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'root',
        dbName: process.env.DB_NAME 
    }
}

module.exports = enviromments