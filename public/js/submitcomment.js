const submitContent = async (event) => {
    event.preventDefault()

    const postId = document.querySelector(".post").dataset.id
    const content = document.querySelector("#comment-content").value.trim()
    const { token } = getToken()

    if (content) {
        const response = await fetch(`${getRoot()}api/posts/${postId}`, {
            method: "POST",
            body: JSON.stringify({ content }),
            headers: {
                "Content-Type": "application/json",
                "x-csrf-token": token
            }
        })

        if (response.status === 201) {
            document.location.reload()
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.errors[0].message)
        }
    } else {
        displayModal("No Comments provided")
    }
}

document.querySelector("#submit").addEventListener("click", submitContent)
