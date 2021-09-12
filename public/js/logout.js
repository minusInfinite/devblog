const logout = async () => {
    const response = await fetch("/api/users/logout", {
        method: "Post",
        headers: { "Content-Type": "application/json" },
    })

    if (response.status === 204) {
        document.location.replace("/")
    } else {
        displayModal(response.statusText)
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

document.querySelector("#logout").addEventListener("click", logout)
