import Status from "./Status.js";
const section = document.querySelector("section.wrap");
const statusBtn = document.querySelector("ul.status-btns");

class StatusManager {
  constructor() {
    // 상태와 관련된 데이터 초기화
    this.status = []; // 상태 목록
    this.statusBtns = []; // 상태 버튼 목록
    this.list = []; // 상태별 할 일 리스트
    this.todos = []; // 전체 할 일 목록
  }

  // 할 일 목록을 받아와 상태별로 화면에 표시
  getToDos(todos) {
    this.todos = [...todos];
    this.paintStatusList();
  }

  // 새로운 상태를 추가
  updateStatus(status) {
    // 중복 상태 방지
    if (this.status.includes(status)) {
      alert("이미 존재하는 상태입니다.");
      return false;
    }

    // 새로운 상태를 추가하고 상태 리스트 생성
    this.status = [...this.status, new Status(status)];
    this.createStatusList(status);
  }

  // 새로운 상태에 대한 리스트를 화면에 생성
  createStatusList(status) {
    const div = document.createElement("div");
    div.innerHTML = `
        <h2>${status}</h2>
        <ul id="${status}" class="status-list"></ul>
    `;
    div.dataset.key = status; // 상태 키 설정
    section.append(div); // 섹션에 추가
    const list = div.querySelector("ul");
    this.list = [...this.list, list]; // 리스트 배열에 추가
    return list;
  }

  // 새로운 상태 버튼을 화면에 표시
  paintStatus(status) {
    const li = document.createElement("li");
    li.innerHTML = `<button>${status}</button>`;
    li.dataset.key = status; // 상태 키 설정
    li.className = status; // 상태 이름을 클래스에 추가
    this.statusBtns = [...this.statusBtns, li]; // 상태 버튼 배열에 추가

    // 상태 버튼 클릭 시 상태 삭제 처리
    li.addEventListener("click", (event) => {
      this.deleteStatus(event.currentTarget.dataset.key);
      statusBtn.append(...this.statusBtns);
    });

    // 상태 버튼을 화면에 추가
    statusBtn.append(...this.statusBtns);
  }

  // 상태별로 할 일 리스트를 화면에 표시
  paintStatusList() {
    // 기존 리스트 초기화
    this.list.forEach((list) => {
      while (list.firstChild) {
        list.firstChild.remove();
      }
    });

    // 할 일 데이터를 기반으로 리스트 생성
    this.todos.forEach((todo) => {
      const li = document.createElement("li");
      li.setAttribute("draggable", true); // 드래그 가능 설정
      li.innerHTML = `${todo.value}`; // 할 일 내용 표시
      li.dataset.key = todo.id; // 할 일 ID 설정
      li.dataset.status = todo.status; // 할 일 상태 설정

      // 해당 상태의 리스트에 할 일 추가
      this.list.forEach((list) => {
        if (list.id === li.dataset.status) list.append(li);
      });

      // TODO: 더블 클릭 시 수정 기능 추가 예정
      // li.addEventListener("dblclick", handleDoubleClick);
    });
  }

  // 상태 삭제
  deleteStatus(status) {
    // 해당 상태의 할 일 상태 초기화
    this.todos.forEach((todo) => {
      if (todo.status === status) {
        todo.status = "";
      }
    });

    // 상태 목록에서 삭제
    this.status = this.status.filter((elem) => elem.status != status);

    // 상태 버튼 초기화
    this.statusBtns.length = 0;

    // 상태 리스트에서 삭제
    this.list = this.list.filter((list) => list.dataset.status != status);

    // 남아 있는 상태를 다시 화면에 표시
    this.status.forEach((list) => {
      this.paintStatus(list.status);
    });

    // 상태 버튼 DOM 초기화
    while (statusBtn.firstChild) {
      statusBtn.firstChild.remove();
    }

    // 상태 리스트 삭제
    this.deleteStatusList(status);

    // 상태별 할 일 리스트 다시 그리기
    this.paintStatusList();
  }

  // 특정 상태에 해당하는 리스트 DOM 요소 삭제
  deleteStatusList(status) {
    section.childNodes.forEach((list) => {
      if (list.dataset.key === status) {
        list.remove();
      }
    });
  }
}

export default StatusManager;
