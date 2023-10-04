//전역 상태 관리

import ToDoManager from "./ToDoManager.js";
import ValueManager from "./ValueManager.js";

class Store {
  constructor() {
    this.selected;
    this.allToDo = document.querySelector("#all");
    this.TodoList = new ToDoManager();
  }
  updateStore(selected) {
    this.selected = selected;
    this.updateToDos();
    this.updateList();
  }
  updateList() {
    this.allToDo = document.querySelector("#all");
    while (this.allToDo.firstChild) {
      this.allToDo.firstChild.remove();
    }
    this.allToDo.append(this.TodoList.paintTodo());
    this.allToDo.childNodes.forEach((todo) => {
      todo.addEventListener("dblclick", (event) => {
        const prevTodo = event.currentTarget;
        const dataset = event.currentTarget.dataset;
        const input = appendInput(prevTodo);
        input.addEventListener("blur", (e) => {
          const newTodo = e.target.value;
          prevTodo.textContent = newTodo;
          this.TodoList.updateTodo({ ...dataset, value: newTodo });
          this.updateStore();
        });
      });
    });
  }
  updateToDos() {
    this.TodoList.paintTodo();
  }
}

const appendInput = (targetNode) => {
  const input = document.createElement("input");
  const value = targetNode.textContent;
  targetNode.textContent = "";
  targetNode.appendChild(input);
  const childInput = targetNode.querySelector("input");
  childInput.value = value;

  return childInput;
};

const store = new Store();
export default store;
