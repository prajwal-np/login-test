require('dotenv').config()

const config = {
    dbName: process.env.SQL_DB,
    dbConfig: {
        server: process.env.SQL_SERVER,
        options: {
            port: process.env.SQL_PORT,
            trustServerCertificate: true
        },
        authentication: {
            type: "default",
            options: {
                userName: process.env.SQL_USERNAME,
                password: process.env.SQL_PASSWORD
            }
        }
    },
    secret: process.env.SECRET,
    salt:parseInt(process.env.SALT)
}

module.exports =config