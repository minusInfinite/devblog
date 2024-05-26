const loginForm = async (event) => {
    event.preventDefault()
    try {
        const email = document.querySelector("#email-login").value.trim()
        const password = document.querySelector("#password-login").value.trim()
        const { token } = getToken()

        if (email && password) {
            const response = await fetch(`./api/users/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                    "x-csrf-token": token
                }
            })

            if (response.status === 200) {
                window.location.assign("./")
            } else {
                const errMsg = await response.json((msg) => JSON.parse(msg))
                displayModal(errMsg.errors[0].message)
            }
        } else {
            displayModal("Missing Inputs in Sign Up fields")
        }
    } catch (e) {

    }
}

document.getElementById("login").addEventListener("submit", loginForm)
/*document.querySelector(".signup").addEventListener("submit", signupForm)*/
