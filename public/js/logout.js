const logout = async () => {
    const response = await fetch(`/${getRoot()}/api/users/logout`, {
        method: "Post",
        headers: { "Content-Type": "application/json" },
    })

    if (response.status === 204) {      
        document.location.replace(`/${getRoot()}`)
    } else {
        displayModal(response.statusText)
    }
}

document.querySelector("#logout").addEventListener("click", logout)
