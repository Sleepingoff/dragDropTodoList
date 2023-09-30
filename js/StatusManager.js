import { section } from "./index.js";
import Status from "./Status.js";
const statusBtn = document.querySelector("ul.status-btns");
class StatusManger {
  constructor() {
    this.status = [];
    this.statusBtns = [];
    this.list = [];
    this.todos = [];
  }
  getToDos(todos) {
    this.todos = [...todos];
    this.paintStatusList();
  }
  updateStatus(status) {
    if (this.status.includes(status)) {
      alert("이미 존재하는 상태입니다.");
      return false;
    }
    this.status = [...this.status, new Status(status)];
    this.createStatusList(status);
  }
  createStatusList(status) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${status}</h2>
        <ul id="${status}" class="status-list"></ul>
    `;
    div.dataset.key = status;
    section.append(div);
    const list = div.querySelector("ul");
    this.list = [...this.list, list];
    return list;
  }

  paintStatus(status) {
    const li = document.createElement("li");
    li.innerHTML = `<button>${status}</button>`;
    li.dataset.key = status;
    li.className = status;
    this.statusBtns = [...this.statusBtns, li];
    li.addEventListener("click", (event) => {
      this.deleteStatus(event.currentTarget.dataset.key);
      statusBtn.append(...this.statusBtns);
    });
    statusBtn.append(...this.statusBtns);
  }
  paintStatusList() {
    this.list.forEach((list) => {
      while (list.firstChild) {
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
  deleteStatus(status) {
    this.todos.forEach((todo) => {
      if (todo.status === status) {
        todo.status = "";
      }
    });

    this.status = this.status.filter((elem) => elem.status != status);
    this.statusBtns.length = 0;
    this.list = this.list.filter((list) => list.dataset.status != status);
    this.status.forEach((list) => {
      this.paintStatus(list.status);
    });
    while (statusBtn.firstChild) {
      statusBtn.firstChild.remove();
    }
    this.deleteStatusList(status);
    this.paintStatusList();
  }
  deleteStatusList(status) {
    section.childNodes.forEach((list) => {
      if (list.dataset.key === status) {
        list.remove();
      }
    });
  }
}

export default StatusManger;
