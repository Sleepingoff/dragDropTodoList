//전역 상태 관리

class Store {
  constructor(selected) {
    this.selected = selected;
    this.todos = document.querySelector("#all");
    this.containers = document.querySelectorAll("section ul");
  }
  updateStore(selected) {
    this.selected = selected;
    this.todos = document.querySelector("#all");
    this.containers = document.querySelectorAll("section ul");
  }
  updateToDos(todos) {
    while (this.todos.firstChild) {
      this.todos.firstChild.remove();
    }
    this.todos.append(todos);
  }
}
const store = new Store();
export default store;
