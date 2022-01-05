const todoInput = document.querySelector(".input-todo")
const todoButton = document.querySelector(".button-todo")
const listTodo = document.querySelector(".list-todo")
const filterOtion = document.querySelector(".filter-todo")

todoButton.addEventListener("click", addtodo)
listTodo.addEventListener("click", checkdelet)
filterOtion.addEventListener("click", filterTodo)

function addtodo(event) {
  event.preventDefault()
  //create div
  const todoDiv = document.createElement("div")
  todoDiv.classList.add("todo")

  //create li
  const newTodo = document.createElement("li")
  newTodo.classList.add("todo-item")
  newTodo.innerText = todoInput.value

  todoDiv.appendChild(newTodo)

  const completeButton = document.createElement("button")
  completeButton.innerHTML = "<i class='fas fa-check'></i>"
  completeButton.classList.add("complete-btn")
  todoDiv.appendChild(completeButton)

  const trashButton = document.createElement("button")
  trashButton.innerHTML = "<i class='fas fa-trash'></i>"
  trashButton.classList.add("trash-btn")
  todoDiv.appendChild(trashButton)

  listTodo.appendChild(todoDiv)

  todoInput.value = ""
}

function checkdelet(e) {
  const item = e.target
  //delet item
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement
    todo.classList.add("fall")
    todo.addEventListener("transitionend", () => todo.remove())
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement
    todo.classList.toggle("completed")
  }
}

function filterTodo(event) {
  const type = event.target.value
  const todos = document.querySelectorAll(".todo")

  for (const todo of todos) {
      switch (type) {
        case "all":
          todo.style.display = "flex"
          break
    
        case "completed":
          todo.className.includes("completed")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
          break
        case "uncompleted":
          !todo.className.includes("completed")
            ? (todo.style.display = "flex")
            : (todo.style.display = "none")
            break
      }
  }
}
