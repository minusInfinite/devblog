const { User } = require("../../models")

const userRouter = require("express").Router()

/*userRouter.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body)

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.status(201).json(userData)
        })
    } catch (err) {
        res.status(400).json(err)
    }
})*/

userRouter.post("/login", async (req, res) => {
    try {

        const userData = await User.findOne({
            where: { email: req.body.email },
        })

        if (!userData) {
            res.status(400).json({
                errors: [
                    {
                        message:
                            "Incorrect Email or Password, please try again",
                    },
                ],
            })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({
                errors: [
                    {
                        message:
                            "Incorrect Email or Password, please try again",
                    },
                ],
            })
            return
        }

        req.session.save(() => {
            req.session.user_id = userData.id
            req.session.logged_in = true

            res.status(200).json({
                message: "You're now logged in!",
            })
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

userRouter.post("/logout", (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = userRouter
