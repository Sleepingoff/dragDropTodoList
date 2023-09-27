//전역 상태 관리

class Store {
  constructor() {
    this.selected;
    this.todos = document.querySelector("#all");
  }
  updateStore(selected) {
    this.selected = selected;
    this.todos = document.querySelector("#all");
  }
  updateToDos(todos) {
    while (this.todos.firstChild) {
      this.todos.firstChild.remove();
    }
    this.todos.append(todos);
    this.todos.childNodes.forEach((todo) => {
      todo.addEventListener("dragstart", (event) => {
        this.updateStore(event.target);
      });
    });
  }
}
const store = new Store();
export default store;
