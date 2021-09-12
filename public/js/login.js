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

    const name = document.querySelector("#email-signup").value.trim()
    const email = document.querySelector("#email-signup").value.trim()
    const password = document.querySelector("#password-signup").value.trim()

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 200) {
            document.location.replace("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.message)
        }
    } else {
        displayModal("Missing Inputs in Login fields")
    }
}

const displayModal = function (message) {
    const model = document.querySelector("#modal")
    const modelContent = document.querySelector("#modal-content")
    const modelClose = document.querySelector(".modal-close")

    window.onclick = function (e) {
        if (e.target === model) {
            modelContent.replaceChildren()
            model.style.display = "none"
        }
    }

    modelClose.onclick = function () {
        modelContent.replaceChildren()
        model.style.display = "none"
    }

    model.style.display = "flex"
    const content = document.createElement("p")
    content.textContent = message
    modelContent.appendChild(content)
}

document.querySelector(".login").addEventListener("submit", loginForm)
document.querySelector(".signup").addEventListener("submit", signupForm)
