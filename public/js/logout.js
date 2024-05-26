const logout = async () => {
    const { token } = await getToken()
    const response = await fetch(`${getRoot()}api/users/logout`, {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            "X-Csrf-Token": token
        }
    })

    if (response.status === 204) {
        window.location.assign("./")
    } else {
        const errMsg = await response.json((msg) => JSON.parse(msg))
        displayModal(errMsg.errors[0].message)
    }
}

document.querySelector("#logout").addEventListener("click", logout)
