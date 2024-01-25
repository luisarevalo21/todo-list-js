import Projects from "./Projects";
import TodoItem from "./TodoItem";
import User from "./User";
import Modal from "./Modal";
import LocalStorage from "./localStorage";

import "./styles.css";

function UIController() {
  const addProject = document.getElementById("add-new-list");
  const usersProjects = document.getElementById("users-projects");
  const newUser = new User("User");
  const localStorage = new LocalStorage(newUser);
  const addTodoItem = document.getElementById("add-new-todo");
  const selected = document.querySelectorAll("[data-list-selected]");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("new-todo-form");
  const modal = new Modal();
  const noTasks = document.getElementById("no-tasks");
  const title = document.getElementById("title");

  function renderProjects() {
    usersProjects.innerHTML = ""; // Clear existing content

    console.log(usersProjects.innerHTML);
    console.log("rendering projects", newUser.getProjects());
    newUser.getProjects().forEach(project => {
      usersProjects.innerHTML += `
        <div class="project-item">
          <span class="material-symbols-outlined"> calendar_month </span>
          <p class="project-title">${project.name}</p>
          <p class="project-num">${project.value}</p>
        </div>`;
    });
  }

  function renderTodoItems(title = "") {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear existing content
    const userTodosFromLocal = localStorage.getTodosFromLocalStorage();

    console.log("user", userTodosFromLocal);
    //render a string showing now todos
    //or blank tbutton to add todos
    if (newUser.getTodos(title).length === 0) {
      return;
    }

    if (userTodosFromLocal.length === 0) {
      console.log("no todos found");
      return;
    }

    if (userTodosFromLocal.length !== 0) {
      noTasks.style.display = "none";
      // console.log("rendering todo items", newUser.getTodos());
      userTodosFromLocal.forEach(todo => {
        console.log("todo", todo);
        todoList.innerHTML += `<div class="todo-container">
        <div class="todo-item">
          <input type="checkbox" />
          <div class="todo-text">
            <h3 class="todo-title">${todo.title}</h3>
            <p class="todo-subtitle">${todo.description}</p>
          </div>
        </div>
      </div>`;
      });
    }
  }

  function addNewProject() {
    console.log("new proejct clicked");
    newUser.addProject(new Projects("New Project"));

    renderProjects();
  }

  function toggleModal() {
    console.log("toggle modal clicked");
    if (modal.show) {
      modal.toggleModal();
    } else {
      modal.toggleModal();
    }
  }
  function handleTodoItemClicked() {
    toggleModal();
  }

  function submitNewTodo(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    newUser.addTodoItem(new TodoItem(title, description, date, priority));

    console.log(newUser.getTodos("Anytime"));
    localStorage.setTodosToLocalStorage(newUser.getTodos("Anytime"));
    toggleModal();
    renderTodoItems();
  }
  function selctedProject() {
    selected.forEach(project =>
      project.addEventListener("click", function () {
        const title = project.dataset.listTitle;
        document.getElementById("header-title").textContent = title;
        renderTodoItems(title);
      })
    );
  }

  addProject.addEventListener("click", addNewProject);
  addTodoItem.addEventListener("click", handleTodoItemClicked);
  overlay.addEventListener("click", toggleModal);
  cancelBtn.addEventListener("click", toggleModal);
  form.addEventListener("submit", submitNewTodo);
  selctedProject();
  renderTodoItems();
}

//double check on fitlering if its weorkingcorrect;y
//move on to removing a todo when checkcing it
// add the todos date
//and todays date at the top plus the icon

UIController();
