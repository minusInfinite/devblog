const { User } = require("../models")

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
const makeAdmin = async (req, res, next) => {
    try {
        const adminPass = process.env.ADMINPASS
        const adminName = process.env.ADMINNAME
        const adminEmail = process.env.ADMINEMAIL
        const hasAdmin = await User.findOne({
            where: { email: `${adminEmail}` },
        })

        if (!hasAdmin) {
            await User.create(
                {
                    name: adminName,
                    email: adminEmail,
                    password: adminPass,
                },
                { individualHooks: true }
            )
            console.log("Admin created")
        }
    } catch (err) {
        next(err)
    } finally {
        next()
    }
}

module.exports = makeAdmin
