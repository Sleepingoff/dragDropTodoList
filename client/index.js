import store from "./js/store.js";
import StatusManager from "./js/StatusManager.js";

// 메인 섹션 DOM 요소 가져오기
const section = document.querySelector("section.wrap");

// 상태 관리 객체 생성
const statusManager = new StatusManager();

// 폼 및 입력 필드 DOM 요소 가져오기
const statusForm = document.querySelector("#status");
const statusInput = statusForm.querySelector("input");
const addBtn = statusForm.querySelector("#add-status");
const todoForm = document.querySelector("#todo");
const todoInput = todoForm.querySelector("input");
const deleteBtn = document.querySelector("#delete");

// 기본 상태 초기화
// 'archive', 'progress', 'done' 상태를 화면에 표시하고 리스트 생성
statusManager.paintStatus(`archive`);
statusManager.paintStatus(`progress`);
statusManager.paintStatus(`done`);
statusManager.createStatusList(`archive`);
statusManager.createStatusList(`progress`);
statusManager.createStatusList(`done`);

// 상태 추가 폼 제출 이벤트 처리
statusForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 입력값 검증
  if (!statusInput.value) {
    alert("상태를 입력해주세요");
    return false;
  }

  // 새로운 상태 추가
  const newStatus = statusInput.value;
  statusManager.updateStatus(newStatus); // 상태 업데이트
  statusManager.paintStatus(newStatus); // 상태 화면에 표시

  // 입력 필드 초기화
  statusInput.value = "";
});

// 할 일 추가 폼 제출 이벤트 처리
todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // 입력값 검증
  if (!todoInput.value) {
    alert("할 일을 입력해주세요");
    return false;
  }

  // 새로운 할 일을 생성하고 저장소에 추가
  store.TodoList.createTodo(todoInput.value);
  todoInput.value = ""; // 입력 필드 초기화

  // 저장소 업데이트 및 할 일 목록 갱신
  store.updateStore();
  statusManager.getToDos(store.TodoList.todos);

  // 각 할 일 항목에 드래그 이벤트 추가
  store.allToDo.childNodes.forEach((todo) => {
    todo.addEventListener("dragstart", (event) => {
      const selected = event.currentTarget;
      const selectedInfo = { ...selected.dataset };

      // 드래그된 항목의 정보를 저장소에 업데이트
      store.updateStore(selectedInfo);
      statusManager.getToDos(store.TodoList.todos);
    });
  });
});

// 삭제 버튼에 드래그 앤 드롭 이벤트 추가
deleteBtn.addEventListener("dragover", (e) => e.preventDefault());
deleteBtn.addEventListener("drop", () => {
  // 선택된 할 일을 삭제
  store.TodoList.deleteTodo(store.selected);

  // 화면 및 저장소 갱신
  store.TodoList.paintTodo();
  store.updateStore();
  statusManager.getToDos(store.TodoList.todos);
});

// 섹션 내 드래그 앤 드롭 이벤트 처리
section.addEventListener("dragover", (event) => {
  event.preventDefault(); // 드래그 가능하도록 기본 동작 방지
});

section.addEventListener("drop", (event) => {
  if (event.target.nodeName === "UL") {
    // 드롭된 위치의 상태로 할 일 업데이트
    store.TodoList.updateTodo(store.selected, event.target.id);

    // 저장소 및 화면 갱신
    store.updateStore();
    statusManager.getToDos(store.TodoList.todos);
  }
});

// 드래그 시작 시 선택된 할 일의 데이터를 저장
section.addEventListener("dragstart", (event) => {
  store.updateStore({
    ...event.target.dataset,
    value: event.target.textContent,
  });
});

// TODO: 수정 버튼 클릭 시 내용 수정 기능 추가 예정
