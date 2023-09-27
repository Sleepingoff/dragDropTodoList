import { section } from "./index.js";
import Status from "./Status.js";
import store from "./store.js";

class StatusManger {
  constructor() {
    this.status = [];
    this.list = [];
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
      list.childNodes.forEach((li) => {
        if (li != store.selected) li.remove();
      });
      //전체 리스트에서 상태 리스트로 복사해 추가하기
      store.todos.childNodes.forEach((todo) => {
        const copiedToDo = todo.cloneNode(true);
        if (list.id === copiedToDo.dataset.status) list.appendChild(copiedToDo);
      });
      store.updateStore();
    });
  }
}

export default StatusManger;
