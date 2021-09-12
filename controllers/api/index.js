const userRouter = require("./userRoutes")
const apiRouter = require("express").Router()

apiRouter.use("/users", userRouter)

module.exports = apiRouter
