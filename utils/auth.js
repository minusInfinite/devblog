/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const isAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect("/login")
    } else {
        next()
    }
}

module.exports = isAuth
