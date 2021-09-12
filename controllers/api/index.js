const postRouter = require("./postRoutes")
const userRouter = require("./userRoutes")
const apiRouter = require("express").Router()

apiRouter.use("/users", userRouter)
apiRouter.use("/posts", postRouter)

module.exports = apiRouter
