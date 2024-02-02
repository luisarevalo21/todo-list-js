import Projects from "./Projects";
import TodoItem from "./TodoItem";
import User from "./User";
import Modal from "./Modal";
import LocalStorage from "./localStorage";
import moment from "moment";
import "./styles.css";

function UIController() {
  const addProject = document.getElementById("add-new-list");
  const usersProjects = document.getElementById("users-projects");
  const newUser = new User("User");
  const localStorage = new LocalStorage();
  const addTodoItem = document.getElementById("add-new-todo");
  const selected = document.querySelectorAll("[data-list-selected]");
  const cancelBtn = document.getElementById("cancel-btn");
  const form = document.getElementById("new-todo-form");
  const modal = new Modal("new-todo-modal");
  const newProjectModal = new Modal("new-project-modal");

  // const detailModal = new Modal("todo-descrption-modal");

  const noTasks = document.getElementById("no-tasks");
  const title = document.getElementById("title");

  function renderProjects() {
    usersProjects.innerHTML = ""; // Clear existing content

    newUser.getProjects().forEach(project => {
      console.log("project", project);
      usersProjects.innerHTML += `
        <div class="project-item" data-list-selected="false" data-list-title=${project.title}>
          <span class="material-symbols-outlined"> calendar_month </span>
          <p class="project-title">${project.title}</p>
          <p class="project-description">${project.description}</p>
          <p class="project-num">${project.value}</p>
        </div>`;
    });

    document.querySelectorAll("[data-list-selected]").forEach(project => {
      project.addEventListener("click", function () {
        const title = project.dataset.listTitle;

        console.log("titl;e inwside query", title);
        document.getElementById("header-title").textContent = title;
        renderTodoItems(title);
      });
    });

    //   <div class="project-item" id="today" data-list-selected="false" data-list-title="Today">
    //   <span class="material-symbols-outlined icon"> star </span>
    //   <p class="project-title">Today</p>
    //   <p class="project-num" id="today-todos"></p>
    // </div>
  }

  function renderTodosValue(value = "", todos) {
    if (value === "Today") {
      document.getElementById("today-todos").textContent = todos.length;
    } else if (value === "Week") {
      document.getElementById("week-todos").textContent = todos.length;
    } else {
      document.getElementById("todos").textContent = todos.length;
    }
  }
  function renderTodoItems(title = "Today") {
    const todoList = document.getElementById("todo-list");
    todoList.innerHTML = ""; // Clear existing content
    let usersTodos = null;
    console.log("title", title);

    console.log("new user", newUser.getTodos(title));
    if (title === "Today") {
      usersTodos = newUser.getTodos("Today");
    } else usersTodos = newUser.getTodos(title);

    console.log("users todos", usersTodos);
    if (usersTodos === undefined) {
      noTasks.style.display = "block";

      return;
    }
    if (usersTodos.length === 0) {
      noTasks.style.display = "block";
    }
    console.log("users todos", usersTodos);

    renderTodosValue(title, usersTodos);

    // localStorage.setTodosToLocalStorage(usersTodos);
    // const userTodosFromLocal = usersTodos;

    //render a string showing now todos
    // //or blank tbutton to add todos
    // if (newUser.getTodos(title).length === 0) {
    //   return;
    // }

    // if (userTodosFromLocal.length === 0) {

    //   return;
    // }

    if (usersTodos.length !== 0) {
      noTasks.style.display = "none";
      usersTodos.forEach(todo => {
        todoList.innerHTML += `<div class="todo-container" data-todo-id=${todo.id}>
        <div class="todo-item">
          <input type="checkbox" data-checked-id=${todo.id} />
          <div class="todo-text">
            <h3 class="todo-title">${todo.title}</h3>
            <p class="todo-subtitle">${todo.description}</p>
          </div>
         <span class="material-symbols-outlined edit" data-todo-id=${todo.id} id="edit-btn">edit</span>

        </div>
      </div>`;
      });
    }
    // <span class="material-symbols-outlined">edit</span>
    //

    const todoItems = document.querySelectorAll("[data-checked-id]");
    todoItems.forEach(todoItem => todoItem.addEventListener("change", e => deleteTodoItem(e, title)));

    const todos = document.querySelectorAll("#edit-btn");
    todos.forEach(todo => todo.addEventListener("click", e => displayTodoItem(e, todo)));
  }

  function displayTodoItem(e) {
    toggleModal();
    const data = newUser.getTodoById(e.target.dataset.todoId);
    console.log("data", data);
    newUser.setTodoToEdit(data[0]);

    document.getElementById("title").value = data[0].title;
    document.getElementById("description").value = data[0].description;
    document.getElementById("due-date").value = data[0].dueDate;
    document.getElementById("priority").value = data[0].priority;
  }
  function deleteTodoItem(e, title) {
    const todoId = e.target.dataset.checkedId;
    newUser.removeTodoItem(todoId);

    if (title === "Today") {
      localStorage.setTodosToLocalStorage(newUser.getTodos("Today"));
    }

    renderTodoItems(title);
    // renderTodoItems(title);

    // localStorage.setTodosToLocalStorage(filteredTodos);
    // renderTodoItems();
    // const userTodosFromLocal = localStorage.getTodosFromLocalStorage();
    // const filteredTodos = userTodosFromLocal.filter(todo => todo.id !== todoId);
    // localStorage.setTodosToLocalStorage(filteredTodos);
    // renderTodoItems();
  }

  function addNewProject() {
    newProjectModal.showModal();
    newUser.setNewProjectCalled();

    // newUser.addProject(new Projects("New Project"));

    // renderProjects();
  }

  function toggleModal() {
    if (modal.show || newProjectModal.show) {
      modal.hideModal();
      // newProjectModal.hideModal();
    } else {
      modal.showModal();
      document.getElementById("submit-btn").style.display = "block";
    }
  }

  function handleTodoItemClicked() {
    toggleModal();
  }

  function submitNewTodo(e) {
    console.log("submit called");
    e.preventDefault();

    if (newUser.getNewProjectCalled()) {
      console.log("inside first if");
      const projectTitle = document.getElementById("project-title").value;
      const projectDescription = document.getElementById("project-description").value;

      newUser.addProject(new Projects(projectTitle, projectDescription));
      renderProjects();
      toggleModal();
      return;
    }
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const date = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;

    if (newUser.getTodoToEdit().length !== 0) {
      const todoItemId = newUser.getTodoToEdit().id;
      const updatedTodo = new TodoItem(title, description, date, priority, null, todoItemId);
      newUser.updateTodoItem(updatedTodo);
    } else {
      newUser.addTodoItem(new TodoItem(title, description, date, priority));
    }

    // const todaysTodos = newUser.getTodos("Today");

    form.reset();
    toggleModal();
    renderTodoItems();
  }
  function selctedProject() {
    console.log("selected", selected);
    selected.forEach(project =>
      project.addEventListener("click", function () {
        const title = project.dataset.listTitle;
        document.getElementById("header-title").textContent = title;
        renderTodoItems(title);
      })
    );
  }

  function setUsersTodos() {
    const userTodos = localStorage.getTodosFromLocalStorage();
    if (userTodos.length !== 0) {
      newUser.setTodoItems(userTodos);
    }
  }
  addProject.addEventListener("click", addNewProject);
  addTodoItem.addEventListener("click", handleTodoItemClicked);
  overlay.addEventListener("click", toggleModal);
  cancelBtn.addEventListener("click", toggleModal);
  form.addEventListener("submit", submitNewTodo);
  setUsersTodos();
  selctedProject();
  renderProjects();
  renderTodoItems();
}

UIController();
