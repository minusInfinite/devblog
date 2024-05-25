const { doubleCsrf } = require("csrf-csrf")

const isProd = process.env.NODE_ENV === 'production'

const { invalidCsrfTokenError, generateToken, doubleCsrfProtection } = doubleCsrf({
    getSecret: () => {
        return Buffer.from(process.env.PSECRET, "base64").toString("base64url")
    },
    cookieName: 'x-csrf-token',
    cookieOptions: {
        sameSite: "strict",
        path: "/",
        secure: isProd
    },
    getTokenFromRequest: (req) => {
        const content = req.headers['content-type']
        if (content.includes('form')) {
            return req.locals._crsf['CSRFToken']
        } else {
            return req.headers['x-csrf-token']
        }
    }
})

const csrfErrorHandler = (error, req, res, next) => {
    if (error === invalidCsrfTokenError) {
        res.status(401).json({
            error: "csrf-validation-error"
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
    getCsrfTokenHandler
}