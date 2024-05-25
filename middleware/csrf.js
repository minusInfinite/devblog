const { doubleCsrf } = require("csrf-csrf")
const isProd = process.env.NODE_ENV === 'production'
const basePath = process.env.ROOT === undefined ? "/" : `/${process.env.ROOT}`

const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => {
        return process.env.CCSECRET
    },
    cookieName: "__Host-minusinfinite.x-csrf-token",
    cookieOptions: {
        sameSite: "strict",
        path: "/",
        secure: true
    },
    getTokenFromRequest: (req) => {
        return req.headers["x-csrf-token"]
    }
})

/**
 * 
 * @param {import('express').Errback} error 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 * @param {import('express').NextFunction} next 
 */
const csrfErrorHandler = (error, req, res, next) => {
    if (error === invalidCsrfTokenError) {
        res.status(401).json({
            errors: [{
                message: "csrf-validation-error"
            },]
        })
    } else {
        next()
    }
}

function getCsrfTokenHandler(req, res) {
    const token = generateToken(req, res)
    return res.json({ token })
}

module.exports = {
    csrfProtection: [doubleCsrfProtection, csrfErrorHandler],
    getCsrfTokenHandler,
    generateToken
}