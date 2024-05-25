const logout = async () => {
    const csrf_token = getToken()
    const response = await fetch(`${getRoot()}api/users/logout`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "X-Csrf-Token": csrf_token.token
        }
    })

    if (response.status === 204) {
        document.location.replace(`${getRoot()}`)
    } else {
        const errMsg = await response.json((msg) => JSON.parse(msg))
        displayModal(errMsg.errors[0].message)
    }
}

document.querySelector("#logout").addEventListener("click", logout)
