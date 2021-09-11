const { Post, User } = require("../models")

const homeRouter = require("express").Router()

homeRouter.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render("homepage", {
            posts,
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

homeRouter.get("/login", async (req, res) => {
    try {
        res.render("login")
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = homeRouter
