const submitPost = async (event) => {
    event.preventDefault()

    const title = document.querySelector("#new-post-title").value.trim()
    const content = document.querySelector("#new-post-content").value.trim()
    const csrf_token = document.querySelector("meta[name=csrf-token]") === HTMLMetaElement
        ?
        document.querySelector("meta[name=csrf-token]").getAttribute('content')
        : undefined;

    if (title && content) {
        const response = await fetch(`${getRoot()}api/posts/`, {
            method: "POST",
            body: JSON.stringify({ title, content }),
            headers: csrf_token ?
                { "Content-Type": "application/json", "x-csrf-token": csrf_token } :
                { "Content-Type": "application/json" },
        })

        if (response.status === 201) {
            document.location.assign(`${getRoot()}dashboard`)
        } else {
            const errMsg = await response.json((msg) => JSON.parse(msg))
            displayModal(errMsg.errors[0].message)
        }
    } else {
        displayModal("No content entered")
    }
}

document.querySelector("#submit-new-post").addEventListener("click", submitPost)
