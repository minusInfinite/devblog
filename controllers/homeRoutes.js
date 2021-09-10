const homeRouter = require("express").Router()

homeRouter.get("/", async (req, res) => {
    try {
        res.render("homepage")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = homeRouter
