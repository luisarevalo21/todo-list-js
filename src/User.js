import TodoItem from "./TodoItem";
import moment from "moment";
import Projects from "./Projects";
const today = moment().format("YYYY-MM-DD");

export default class User {
  constructor(name) {
    this.name = name;
    this.projects = [new Projects("test")];
    this.todos = [];
    this.newProjectCalled = false;
    this.todoToEdit = [];
    this.selectedProject = null;
  }

  setNewProjectCalled() {
    this.newProjectCalled = !this.newProjectCalled;
  }
  getNewProjectCalled() {
    return this.newProjectCalled;
  }
  setTodoToEdit(todo) {
    this.todoToEdit = todo;
  }
  getTodoToEdit() {
    return this.todoToEdit;
  }

  addProject(project) {
    this.projects.push(project);
  }

  addTodoItem(todoItem) {
    this.todos.push(todoItem);
  }

  getProjects() {
    return this.projects;
  }

  removeTodoItem(todoId) {
    this.todos = this.todos.filter(todo => todo.id !== todoId);
    // this.todos = filteredTodos;
    // console.log("todos", filteredTodos);
    // return filteredTodos;
    //remove todo item from todos array
  }

  updateTodoItem(todo) {
    console.log("todo inside of update", todo);
    this.todos = this.todos.map(item => {
      console.log("todo", todo.id === item.id);

      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });
  }
  //if today get totdays date and return todos with that date
  //if upcoming get todos with dates after today filter todos that are bnot today

  getTodos(filter = "") {
    if (filter === "Anytime" || filter === "") {
      return this.todos;
    } else if (filter === "Today") {
      return this.todos.filter(todo => todo.dueDate === today);
    } else if (filter === "Week") {
      const startOfWeek = moment().startOf("week").format("YYYY-MM-DD");
      const endOfWeek = moment().endOf("week").format("YYYY-MM-DD");

      return this.todos.filter(todo => {
        console.log(startOfWeek <= todo.dueDate && todo.dueDate <= endOfWeek);
        return startOfWeek <= todo.dueDate && todo.dueDate <= endOfWeek;
      });
    }
  }
  getTodoById(id) {
    // console.log("id", id);

    // console.log("todos", this.todos);
    return this.todos.filter(todo => todo.id === id);
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  setSelectedProject(project) {
    this.selectedProject = project;
  }
  setTodoItems(todos) {
    this.todos = todos.map(todo => {
      return new TodoItem(todo.title, todo.description, todo.dueDate, todo.priority, todo.id);
    });
  }
}
