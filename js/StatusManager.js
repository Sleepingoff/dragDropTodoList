import { section } from "./index.js";
import Status from "./Status.js";

class StatusManger {
  constructor() {
    this.status = [];
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
    return list;
  }

  paintStatus(status) {
    const li = document.createElement("li");
    li.innerHTML = `<button>${status}</button>`;
    return li;
    // this.list.childNodes.forEach((list) => {
    //   if (list != selected) list.remove();
    // });
    //전체 리스트에서 상태 리스트로 복사해 추가하기
    // todoList.childNodes.forEach((todo) => {
    //   const copiedToDo = todo.cloneNode(true);
    //   if (this.list.id === copiedToDo.dataset.status)
    //     this.list.appendChild(copiedToDo);
    // });
    // selected.remove();
  }
}

export default StatusManger;
