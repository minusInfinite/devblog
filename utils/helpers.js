const { randomBytes } = require("crypto")

module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString()
    }
}
