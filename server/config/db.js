var mysql = require("mysql");
const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('./config.json');
module.exports = db = {};

async function initialize() {
    const dialect = 'mysql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;
    await ensureDbExists(dbName);
    const sequelize = new Sequelize(dbName, userName, password, { host, dialect });
    db.User = require('../auth/auth.model')(sequelize);
    await sequelize.sync({ alter: true });
}
initialize();

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const sqlConnection =  mysql.createConnection({
            host: dbConfig.server,
            user: dbConfig.authentication.options.userName,
            password: dbConfig.authentication.options.password,
            database: dbName 
        });
        sqlConnection.connect((err)=>{
            if (err) {
                console.log("Error occurred", err);
                reject(err)
              } else {
              const sql = "SHOW TABLES LIKE 'user';"
                sqlConnection.query(sql, function (err, result) {
                  if (err) {
                    console.log(err);
                    reject(err)
                  }
                resolve('db created')
                });
              }
        })
    });
}