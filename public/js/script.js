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
    const content = document.createElement("pre")
    content.textContent = message
    modelContent.appendChild(content)
}

const getRoot = function () {
    const base = ["login", "logout", "dashboard", "edit", "post", "new"]
    const root = window.location.pathname.split("/")[1]
    let baseRoot = base.includes(root) ? `/` : `/${root}/`

    return baseRoot
}

const getToken = () => {
    let token = document.querySelector("meta[name=csrf-token]").content
    return { token }
}