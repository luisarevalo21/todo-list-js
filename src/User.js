import TodoItem from "./TodoItem";
import moment from "moment";
const today = moment().format("YYYY-MM-DD");

export default class User {
  constructor(name) {
    this.name = name;
    this.projects = [];
    this.todos = [
      new TodoItem("test", "test", today, "low", "test"),
      new TodoItem("differfnt date", "different date", "01/25/2024", "low", "test"),
    ];
    this.selectedProject = null;
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

  //if today get totdays date and return todos with that date
  //if upcoming get todos with dates after today filter todos that are bnot today

  getTodos(filter = "") {
    console.log("fil;ter", filter);
    if (filter === "Anytime") {
      return this.todos;
    } else if (filter === "Today") {
      return this.todos.filter(todo => todo.dueDate === today);
    } else if (filter === "Upcoming") {
      return this.todos.filter(todo => todo.dueDate > today);
    } else return this.todos;
  }

  getSelectedProject() {
    return this.selectedProject;
  }

  setSelectedProject(project) {
    this.selectedProject = project;
  }
}
