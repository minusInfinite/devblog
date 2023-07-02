const { Post, Comment } = require("../../models")
const isAuth = require("../../utils/auth")

const postRouter = require("express").Router()

postRouter.post("/", isAuth, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        })

        res.status(201).json(newPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

postRouter.post("/:id", isAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            post_id: req.params.id,
        })

        res.status(201).json(newComment)
    } catch (err) {
        res.status(400).json(err)
    }
})

postRouter.put("/:id", isAuth, async (req, res) => {
    try {
        const updatePost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.user_id,
                },
            }
        )

        const post = await Post.findByPk(req.params.id)

        res.status(201).json({ updatePost, post })
    } catch (err) {
        res.status(400).json(err)
    }
})

postRouter.delete("/:id", isAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if (!postData) {
            res.status(404).json({
                errors: [{ message: "No Posts found with this ID" }],
            })
            return
        }

        res.status(204).json(postData)
    } catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = postRouter
