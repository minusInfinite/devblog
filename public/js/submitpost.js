const submitPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector("#new-post-title").value.trim()
    const content = document.querySelector("#new-post-content").value.trim()

    if (title && content) {
        const response = await fetch(`/api/posts/`, {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: { "Content-Type": "application/json" },
        })

        if (response.status === 201) {
            document.location.assign("/")
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(JSON.stringify(errMsg))
        }
    } else {
        displayModal("No Comments provided")
    }
}

document.querySelector("#submit-new-post").addEventListener("click", submitPost)
