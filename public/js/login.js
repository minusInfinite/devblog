

const loginForm = async (event) => {
    event.preventDefault()
    try {
        const email = document.querySelector("#email-login").value.trim()
        const password = document.querySelector("#password-login").value.trim()
        const csrf_token = await getToken()

        if (email && password) {
            const response = await fetch(`./api/users/login`, {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: csrf_token ?
                    { "Content-Type": "application/json", "x-csrf-token": csrf_token } :
                    { "Content-Type": "application/json" },
            })

            if (response.status === 200) {
                document.location.replace(`./dashboard`)
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

document.querySelector(".login").addEventListener("submit", loginForm)
/*document.querySelector(".signup").addEventListener("submit", signupForm)*/
