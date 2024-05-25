const { Post, User, Comment } = require("../models")
const { getCsrfTokenHandler, csrfProtection, generateToken } = require('../middleware/csrf.js')

const isAuth = require("../utils/auth")

const homeRouter = require("express").Router()
const basePath = process.env.ROOT ? `/${process.env.ROOT}/` : "/"

homeRouter.get("/", async (req, res, next) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ["name"],
                },
            ],
        })

        const posts = postData.map((post) => post.get({ plain: true })).reverse()

        res.render("homepage", {
            basePath,
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/csrf-token", getCsrfTokenHandler)

homeRouter.get("/dashboard", isAuth, async (req, res, next) => {
    try {
        const _csrf = generateToken(req, res)
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
        })

        const posts = postData.map((post) => post.get({ plain: true })).reverse()

        res.render("dashboard", {
            _csrf,
            basePath,
            posts,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/new/post", isAuth, async (req, res, next) => {
    try {
        const _csrf = generateToken(req, res)
        res.render("newedit", {
            _csrf,
            basePath,
            newPost: true,
            editPost: false,
            editComment: false,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/edit/post/:id", isAuth, async (req, res, next) => {
    try {
        const _csrf = generateToken(req, res)
        const postData = await Post.findByPk(req.params.id)

        const post = postData.get({ plain: true })

        res.render("newedit", {
            _csrf,
            basePath,
            post,
            newPost: false,
            editPost: true,
            editComment: false,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/edit/comment/:id", isAuth, async (req, res, next) => {
    try {
        const _csrf = generateToken(req, res)
        const commentData = await Comment.findByPk(req.params.id)
        const comment = commentData.get({ plain: true })

        res.render("newedit", {
            _csrf,
            basePath,
            comment,
            newPost: false,
            editPost: false,
            editComment: true,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/post/:id", async (req, res, next) => {
    try {
        const _csrf = generateToken(req, res)
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
            _csrf,
            basePath,
            post,
            comments,
            logged_in: req.session.logged_in,
        })
    } catch (err) {
        next()
    }
})

homeRouter.get("/login", (req, res) => {
    const _csrf = generateToken(req, res)

    if (req.session.logged_in) {
        res.redirect("./")
        return
    }

    res.render("login", { _csrf, basePath })
})

module.exports = homeRouter