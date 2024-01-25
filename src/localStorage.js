export default class LocalStorage {
  constructor(user) {
    this.user = user;
  }

  getTodosFromLocalStorage() {
    console.log(localStorage.getItem("todos"));
    if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem("todos"));
  }
  setTodosToLocalStorage(title) {
    localStorage.setItem("todos", JSON.stringify(this.user.getTodos(title)));
  }
}
