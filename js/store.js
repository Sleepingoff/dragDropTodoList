//전역 상태 관리

class Store {
  constructor() {
    this.selected;
    this.todos = document.querySelector("#all");
    this.containers = document.querySelectorAll("section ul");
  }
  updateStore(selected) {
    this.selected = selected;
    this.todos = document.querySelector("#all");
    this.containers = document.querySelectorAll("section ul");
    this.containers.forEach((container) => {
      container.addEventListener("dragstart", (event) => {
        console.log(event.target);
        store.updateStore(event.target);
      });
    });
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
