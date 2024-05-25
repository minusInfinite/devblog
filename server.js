require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const { doubleCsrf } = require("csrf-csrf")
const exqhbs = require("express-handlebars")
const routes = require("./controllers")
const helpers = require("./utils/helpers")

/** @type {import('sequelize').Sequelize} */
const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)
const { Buffer } = require("node:buffer")
const makeAdmin = require("./utils/makeAdmin")

const PORT = process.env.PORT || 3001
const basePath = process.env.ROOT !== undefined ? `/${process.env.ROOT}/` : "/"
const isProd = process.env.NODE_ENV === 'production'

/**
 * @type {import("express-session").SessionOptions}
 */
const sess = {
    secret: process.env.CSECRET,
    cookie: {
        //milliseconds > sessions > minutes
        maxAge: 1000 * 60 * 60,
        sameSite: "strict",
        path: "/",
        httpOnly: isProd,
        secure: isProd
    },
    resave: false,
    name: "connect.blog.sid",
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
}


async function StartServer() {

    const hbs = exqhbs.create({ helpers })
    const app = express()

    app.use(morgan("dev"))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    if (isProd) {
        app.set('trust-proxy', 'loopback, uniquelocal')
    }

    app.use(function (req, res, next) {
        res.set(
            'Content-Security-Policy',
            "default-src 'self'; font-src 'self' https://fonts.gstatic.com/; style-src 'self' https://fonts.googleapis.com"
        )
        next()
    })

    app.use(cors())
    app.use(session(sess))
    app.use(cookieParser(process.env.PSECRET))

    app.engine("handlebars", hbs.engine)
    app.set("view engine", "handlebars")
    app.use(express.static(path.join(__dirname, "public")))
    app.use(routes)

    try {
        await sequelize.sync({ force: false, logging: console.log })
        app.use(makeAdmin)
    } catch (e) {
        throw new Error(e)
    }

    app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}`))

}

StartServer()
    .catch((err) => console.log(err))
