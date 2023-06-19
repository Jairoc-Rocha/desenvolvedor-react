let fsList = document.querySelectorAll(".multiple-field")
for (let i = 0; i < fsList.length; i++) {
    initMultipleFielSet(fsList[i])
}

function initMultipleFielSet(fs) {
    let addButton = document.createElement("button")
    addButton.textContent = "Adicionar"
    addButton.type = "button"

    fs.appendChild(addButton)

    let firstInput = document.querySelector("input")

    addButton.addEventListener("click", function() {
        let div = document.createElement("div")
        let newInput = document.createElement("input")
        newInput.name = firstInput.name
        newInput.type = firstInput.type

        div.appendChild(newInput)

        fs.insertBefore(div, addButton)

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Excluir"
    deleteButton.type = "button"

    div.appendChild(deleteButton)

    deleteButton.addEventListener("click", function() {
        div.remove()
    })
        
    })
}