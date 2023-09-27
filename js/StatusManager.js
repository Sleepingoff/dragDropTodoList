import { section } from "./index.js";
import Status from "./Status.js";
import store from "./store.js";

class StatusManger {
  constructor() {
    this.status = [];
    this.list = [];
    this.todos = [];
  }
  getToDos(todos) {
    this.todos = [...todos];
    this.paintStatusList();
  }
  updateStatus(status) {
    this.status = [...this.status, new Status(status)];
    this.createStatusList(status);
  }
  createStatusList(status) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${status}</h2>
        <ul id="${status}" class="status-list"></ul>
    `;
    section.append(div);
    const list = div.querySelector("ul");
    this.list = [...this.list, list];
    return list;
  }

  paintStatus(status) {
    const li = document.createElement("li");
    li.innerHTML = `<button>${status}</button>`;
    return li;
  }
  paintStatusList() {
    this.list.forEach((list) => {
      while (list.firstChild) {
        console.log("remove", list.firstChild);
        list.firstChild.remove();
      }
    });
    this.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.setAttribute("draggable", true);
      li.innerHTML = `${todo.todo}`;
      li.dataset.key = todo.id;
      li.dataset.status = todo.status;
      this.list.forEach((list) => {
        if (list.id === li.dataset.status) list.append(li);
      });
    });
  }
}

export default StatusManger;
