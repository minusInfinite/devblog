require("dotenv").config()
const path = require("path")
const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const compression = require("compression")
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
        httpOnly: isProd,
        secure: true,
        domain: "minusinfinite.id.au"
    },
    resave: false,
    name: "__Secure-minusinfinite.blog.sid",
    proxy: isProd,
    saveUninitialized: false,
    store: new SequelizeStore({
        db: sequelize,
    }),
}


async function StartServer() {

    morgan.token('req-headers', function(req, res) {
        if (req.method === "POST")

            return JSON.stringify(req.headers);
    })

    const hbs = exqhbs.create({ helpers })
    const app = express()
    app.use(compression())

    if (!isProd) {
        app.use(morgan(':method :url :status :response-time ms - :res[content-length] :req-headers'));
    } else {
        app.use(morgan("dev"))
    }

    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('trust-proxy', ['loopback', '192.168.64.0/24'])


    app.use(function(req, res, next) {
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

    app.use((req, res, next) => {
        if (process.env.SHUTDOWN_DOWN) {
            res.setHeader('Connection', 'close')
        }
        next()
    })

    try {
        await sequelize.sync({ force: false })
        app.use(makeAdmin)
    } catch (e) {
        throw new Error(e)
    }


    const server = app.listen(PORT, () => {
        console.log(`Server Running http://localhost:${PORT}, https://www.minusinfinite.id.au/blog`)
        process?.send ? process.send('ready') : null;
    })

    process.on('SIGTERM', () => {
        consoe.log('SIGTERM signal received')
        process.env.SHUTDOWN_DOWN = true;
        server.close(async () => {
            try {
                await sequelize.close()
                console.log('database disconnected')
                process.exitCode = 0
            } catch (e) {
                throw new Error('SIGTERM Error', { cause: e })
            }
        })
    })

    process.on('SIGINT', () => {
        console.log('SIGINI signal received')
        process.env.SHUTDOWN_DOWN = true;

        server.close(async () => {
            try {
                await sequelize.close()
                console.log('database disconnected')
                process.exitCode = 0
            } catch (e) {
                throw new Error('SIGINT Error', { cause: e })
            }
        })
    })

}

StartServer().catch((err) => {
    console.error('Server Error', {cause: err})
})
