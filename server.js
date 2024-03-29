require("dotenv").config()
const path = require("path")
const express = require("express")
const session = require("express-session")
const exqhbs = require("express-handlebars")
const routes = require("./controllers")
const helpers = require("./utils/helpers")

const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

const app = express()
const PORT = process.env.PORT || 3001

const hbs = exqhbs.create({ helpers })

/**
 * @type {import("express-session").SessionOptions}
 */
const sess = {
    secret: process.env.CSECRET,
    cookie: {
        //milliseconds > sessions > minutes
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
}

app.use(session(sess))
app.engine("handlebars", hbs.engine)
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.use(routes)

// app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}`))

sequelize
    .sync({ force: false })
    .then(() => {
        app.listen(PORT, () =>
            console.log(`Server Running http://localhost:${PORT}`)
        )
    })
    .catch((err) => console.log(err))
