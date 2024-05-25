const router = require("express").Router()
const { getCsrfTokenHandler, csrfProtection } = require('../middleware/csrf.js')

const apiRoutes = require("./api")
const homeRoutes = require("./homeRoutes")
const basePath = process.env.ROOT ? `/${process.env.ROOT}/` : "/"

router.use("/", homeRoutes)
router.use("/api", apiRoutes, csrfProtection)
router.get('/csrf-token', getCsrfTokenHandler)

router.use("*", (req, res) => {
    res.status(404).render("404", { basePath, logged_in: req.session.logged_in })
})

module.exports = router
