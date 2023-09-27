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
}

export default Store;
