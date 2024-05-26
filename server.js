require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const session = require("express-session")
const cookieParser = require("cookie-parser")
const exqhbs = require("express-handlebars")
const routes = require("./controllers")
const helpers = require("./utils/helpers")
const makeAdmin = require("./utils/makeAdmin")


/** @type {import('sequelize').Sequelize} */
const sequelize = require("./config/connection")
const SequelizeStore = require("connect-session-sequelize")(session.Store)

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
        secure: true,
    },
    resave: false,
    proxy: true,
    name: "__Host-minusinfinite.blog.sid",
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
}


async function StartServer() {

    morgan.token('req-headers', function (req, res) {
        if (req.method === "POST")

            return JSON.stringify(req.headers);
    })

    const hbs = exqhbs.create({ helpers })
    const app = express()

    if (!isProd) {
        app.use(morgan(':method :url :status :response-time ms - :res[content-length] :req-headers'));
    } else {
        app.use(morgan("dev"))
    }

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('trust-proxy', ['loopback', '192.168.64.0/25'])

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
        await sequelize.sync({ force: false })
        app.use(makeAdmin)
    } catch (e) {
        throw new Error(e)
    }

    app.listen(PORT, () => console.log(`Server Running http://localhost:${PORT}, https://intranet.minusinfinite.id.au/dev`))

}

StartServer()
    .catch((err) => console.log(err))
