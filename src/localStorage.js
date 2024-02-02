export default class LocalStorage {
  getTodosFromLocalStorage() {
    // console.log(localStorage.getItem("todos"));
    if (localStorage.getItem("todos") === null || localStorage.getItem("todos") === "undefined") {
      return [];
    }
    return JSON.parse(localStorage.getItem("todos"));
  }
  setTodosToLocalStorage(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
