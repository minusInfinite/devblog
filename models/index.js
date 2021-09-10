const Post = require("./Post")
const User = require("./User")

User.hasMany(Post, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})

Post.belongsTo(User, {
    foreignKey: "user_id",
})

module.exports = { User, Post }
