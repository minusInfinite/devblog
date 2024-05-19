const Sequelize = require("sequelize")
require("dotenv").config()

let sequelize

if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
    sequelize = new Sequelize(
        process.env.DBNAME,
        process.env.DBUSER,
        process.env.DBPASS,
        {
            host: "localhost",
            dialect: "postgres",
            port: 5432,
            logging: false,
        }
    )
}

module.exports = sequelize
