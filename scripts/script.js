const todoInput = document.querySelector(".input-todo");
const todoButton = document.querySelector(".button-todo");
const listTodo = document.querySelector(".list-todo");
const filterOtion = document.querySelector(".filter-todo");

// Load todos from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const todos = JSON.parse(localStorage.getItem("todos"));
  if (todos) {
    todos.forEach((todo) => {
      createTodoElement(todo.text, todo.completed);
    });
  }
});

todoButton.addEventListener("click", addtodo);
listTodo.addEventListener("click", checkdelet);
filterOtion.addEventListener("click", filterTodo);

function addtodo(event) {
  event.preventDefault();
  const todoText = todoInput.value;
  createTodoElement(todoText, false);
  saveTodoToLocalStorage(todoText, false);
  todoInput.value = "";
}

function createTodoElement(todoText, completed) {
  // Create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // Create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoText;
  todoDiv.appendChild(newTodo);

  const completeButton = document.createElement("button");
  completeButton.innerHTML = "<i class='fas fa-check'></i>";
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = "<i class='fas fa-trash'></i>";
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  if (completed) {
    todoDiv.classList.add("completed");
  }

  listTodo.appendChild(todoDiv);
}

function checkdelet(e) {
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    const todoText = todo.querySelector(".todo-item").innerText;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      removeTodoFromLocalStorage(todoText);
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    const todoText = todo.querySelector(".todo-item").innerText;
    saveTodoToLocalStorage(todoText, todo.classList.contains("completed"));
  }
}

function filterTodo(event) {
  const type = event.target.value;
  const todos = document.querySelectorAll(".todo");

  for (const todo of todos) {
    switch (type) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        todo.className.includes("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
      case "uncompleted":
        !todo.className.includes("completed")
          ? (todo.style.display = "flex")
          : (todo.style.display = "none");
        break;
    }
  }
}

function saveTodoToLocalStorage(todoText, completed) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push({ text: todoText, completed });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function removeTodoFromLocalStorage(todoText) {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  const updatedTodos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}
