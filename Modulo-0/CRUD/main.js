let employees = []
let roles = []
let selectedItem;
const listEl = document.querySelector("ul")
const formEl = document.querySelector("form")
const bdelete = document.getElementById("bdelete")
const bcancel = document.getElementById("bcancel")
const bsubmit = document.getElementById("bsubmit")
  
async function init() {
     try {
        [employees, roles] = await Promise.all([listEmployees(), listRoles()])
        renderRoles()
        renderData()
        clearSelection()
        bcancel.addEventListener("click", clearSelection)
        formEl.addEventListener("submit", onSubmit)
     } catch (error) {
        showError("Error loading data", Error)
     }
}
init()

function selectItem(employee, li) {
    clearSelection()
    selectedItem = employee
    li.classList.add("selected")
    formEl.name.value = employee.name
    formEl.salary.valueAsNumber = employee.salary
    formEl.role_id.value = employee.role_id
    bdelete.style.display = "inline"
    bcancel.style.display = "inline"
    bsubmit.textContent = "Update"
}

function clearSelection() {
    ClearError()
    selectedItem = undefined
    const li = document.querySelector(".selected")
    if (li) {
        li.classList.remove("selected")
    }
    formEl.name.value = ""
    formEl.salary.value = ""
    formEl.role_id.value = ""
    bdelete.style.display = "none"
    bcancel.style.display = "none"
    bsubmit.textContent = "Create"
}

async function onSubmit(event) {
    event.preventDefault()
    const employeeData = {
        name: formEl.name.value,
        salary: formEl.salary.valueAsNumber,
        role_id: +formEl.role_id.value
    } 
    if (!employeeData.name || !employeeData.salary || !employeeData.role_id ) {
        showError("You must fill all form fields")
    } else {
        if (selectedItem) {
            const updatedItem = await updateEmployees(selectedItem.id, employeeData)
            const i = employees.indexOf(selectItem)
            employees[i] = updatedItem
            renderData()
            selectItem(updatedItem, listEl.children[i])
        } else {
            const createdItem = await createEmployees(employeeData)
            employees.push(createdItem)
            renderData()
            selectItem(createdItem, listEl.lastChild)
            listEl.lastChild.scrollIntoView()
        }
    }       
}

function renderData() {
    listEl.innerHTML = ""
    for (const employee of employees) {
        let role = roles.find((role) => role.id === employee.role_id)
        const li = document.createElement("li")
        const divName = document.createElement("div")
        divName.textContent = employee.name
        const divRole = document.createElement("div")
        divRole.textContent = role.name
        li.appendChild(divName)
        li.appendChild(divRole)
        listEl.appendChild(li)
        li.addEventListener("click", () => selectItem(employee, li)) 
    }
    
  }

  function renderRoles() {
    for (const role of roles) {       
        const option = document.createElement("option")
        option.textContent = role.name
        option.value = role.id
        formEl.role_id.appendChild(option)        
    }   
  }
  
  function showError(message, error) {
    document.getElementById("erros").textContent = message;
    if (error) {
        console.error(error);
    }
    
  }

  function ClearError() {
    document.getElementById("erros").textContent = "";  
    
  }