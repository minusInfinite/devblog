const loginForm = async (event) => {
    event.preventDefault()

    const email = document.querySelector("#email-login").value.trim()
    const password = document.querySelector("#password-login").value.trim()

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 200) {
            document.location.replace("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.message)
        }
    } else {
        displayModal("Missing Inputs in Sign Up fields")
    }
}

const signupForm = async (event) => {
    event.preventDefault()

    const name = document.querySelector("#name-signup").value.trim()
    const email = document.querySelector("#email-signup").value.trim()
    const password = document.querySelector("#password-signup").value.trim()

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 201) {
            document.location.replace("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.message)
        }
    } else {
        displayModal("Missing Inputs in Login fields")
    }
}

document.querySelector(".login").addEventListener("submit", loginForm)
document.querySelector(".signup").addEventListener("submit", signupForm)
