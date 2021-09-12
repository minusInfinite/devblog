const { User } = require("../../models")

const userRouter = require("express").Router()

userRouter.post("/", async (req, res) => {
    try {
        const userData = await User.create(req.body)

        res.status(200).json(userData)
    } catch (err) {
        res.status(400).json(err)
    }
})

userRouter.post("/login", async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { email: req.body.email },
        })

        if (!userData) {
            res.status(400).json({
                message: "Incorrect Email or Password, please try again",
            })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({
                message: "Incorrect Email or Password, please try again",
            })
            return
        }

        res.status(200).json({
            user: userData,
            message: "You're now logged in!",
        })
    } catch (err) {
        res.status(400).json(err)
    }
})

module.exports = userRouter
