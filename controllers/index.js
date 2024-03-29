const router = require("express").Router()

const apiRoutes = require("./api")
const homeRoutes = require("./homeRoutes")
const makeAdmin = require("../utils/makeAdmin")

router.use(makeAdmin)

router.use("/", homeRoutes)
router.use("/api", apiRoutes)

module.exports = router
