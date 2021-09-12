const { Post, User, Comment } = require("../models")
const isAuth = require("../utils/auth")

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
            logged_in: req.session.logged_in,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/dashboard", isAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render("dashboard", {
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/new/post", isAuth, async (req, res) => {
    try {
        res.render("newedit", {
            newPost: true,
            editPost: false,
            editComment: false,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/edit/post/:id", isAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id)

        const post = postData.get({ plain: true })

        res.render("newedit", {
            post,
            newPost: false,
            editPost: true,
            editComment: false,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/edit/comment/:id", isAuth, async (req, res) => {
    try {
        const commentData = await Comment.findByPk(req.params.id)

        const comment = commentData.get({ plain: true })

        res.render("newedit", {
            comment,
            newPost: false,
            editPost: false,
            editComment: true,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        })

        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: [{ model: User, attributes: ["name"] }],
        })

        const post = postData.get({ plain: true })
        const comments = commentData.map((comment) =>
            comment.get({ plain: true })
        )

        res.render("post", {
            post,
            comments,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

homeRouter.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/")
        return
    }

    res.render("login")
})

module.exports = homeRouter
