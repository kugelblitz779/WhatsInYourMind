//selectors
//``````````````````````````````````````````````````
const todoInput = document.querySelector(".take-note");
const todoButton = document.querySelector(".note-button");
const todolist = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event-listeners
//``````````````````````````````````````````````````
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todolist.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//functions
//``````````````````````````````````````````````````

function addTodo(event) {
  //prevent form from submitting
  event.preventDefault();

  //create todo div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //create li tag inside todoDiv
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;

  saveToLocalStorage(todoInput.value);

  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //create check button inside todoDiv
  const checkButton = document.createElement("button");
  checkButton.innerHTML = '<i class="fas fa-check-square"></i>';
  checkButton.classList.add("complete-btn");
  todoDiv.appendChild(checkButton);

  //create delete button inside tododiv
  const delButton = document.createElement("button");
  delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
  delButton.classList.add("del-btn");
  todoDiv.appendChild(delButton);

  //append to tododiv to ul tag
  todolist.appendChild(todoDiv);

  //clear input after typing something
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //Delete todo
  if (item.classList[0] === "del-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");

    removeLocalTodos(todo);

    //waits for the transition of "fall" to finish and then calls remove
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check todo completed
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todolist.childNodes;
  console.log(todos);
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveToLocalStorage(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create li tag inside todoDiv
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //create check button inside todoDiv
    const checkButton = document.createElement("button");
    checkButton.innerHTML = '<i class="fas fa-check-square"></i>';
    checkButton.classList.add("complete-btn");
    todoDiv.appendChild(checkButton);

    //create delete button inside tododiv
    const delButton = document.createElement("button");
    delButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
    delButton.classList.add("del-btn");
    todoDiv.appendChild(delButton);

    //append to tododiv to ul tag
    todolist.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoName = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoName), 1);

  localStorage.setItem("todos", JSON.stringify(todos));
}
