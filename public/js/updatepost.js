const editPost = async (event) => {
    event.preventDefault()

    const postID = document.querySelector("#post").dataset.id
    const title = document.querySelector("#edit-post-title").value.trim()
    const content = document.querySelector("#edit-post-content").value.trim()

    if (title && content) {
        const response = await fetch(`${getRoot()}/api/posts/${postID}`, {
            method: "PUT",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 201) {
            document.location.assign(`${getRoot()}/dashboard`)
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.errors[0].message)
        }
    } else {
        displayModal("No Comments provided")
    }
}

const deletePost = async (event) => {
    event.preventDefault()

    const postID = document.querySelector("#post").dataset.id

    const response = await fetch(`./api/posts/${postID}`, {
        method: "DELETE",
    })

    if (response.status === 204) {
        document.location.assign(`${getRoot()}/dashboard`)
    } else {
        const errMsg = await response.json((msg) => JSON.parse(msg))
        displayModal(errMsg.errors[0].message)
    }
}

document.querySelector("#btn-delete-post").addEventListener("click", deletePost)
document.querySelector("#submit-edit-post").addEventListener("click", editPost)
