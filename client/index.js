import store from "./js/store.js";
import StatusManager from "./js/StatusManager.js";

const section = document.querySelector("section.wrap");

const statusManager = new StatusManager();

const statusForm = document.querySelector("#status");
const statusInput = statusForm.querySelector("input");
const addBtn = statusForm.querySelector("#add-status");
const todoForm = document.querySelector("#todo");
const todoInput = todoForm.querySelector("input");
const deleteBtn = document.querySelector("#delete");

//기본 상태 제공하기
statusManager.paintStatus(`archive`);
statusManager.paintStatus(`progress`);
statusManager.paintStatus(`done`);
statusManager.createStatusList(`archive`);
statusManager.createStatusList(`progress`);
statusManager.createStatusList(`done`);

statusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!statusInput.value) {
    alert("상태를 입력해주세요");
    return false;
  }
  const newStatus = statusInput.value;

  statusManager.updateStatus(newStatus);
  statusManager.paintStatus(newStatus);

  statusInput.value = "";
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!todoInput.value) {
    alert("할 일을 입력해주세요");
    return false;
  }
  //새로운 할 일을 생성
  store.TodoList.createTodo(todoInput.value);
  todoInput.value = "";

  //할 일 목록을 읽어오기
  store.updateStore();
  statusManager.getToDos(store.TodoList.todos);

  store.allToDo.childNodes.forEach((todo) => {
    todo.addEventListener("dragstart", (event) => {
      const selected = event.currentTarget;
      const selectedInfo = { ...selected.dataset };
      store.updateStore(selectedInfo);
      statusManager.getToDos(store.TodoList.todos);
    });
  });
});

//할 일 삭제하기
deleteBtn.addEventListener("dragover", (e) => e.preventDefault());
deleteBtn.addEventListener("drop", () => {
  store.TodoList.deleteTodo(store.selected);
  store.TodoList.paintTodo();
  store.updateStore();
  statusManager.getToDos(store.TodoList.todos);
});

section.addEventListener("dragover", (event) => {
  event.preventDefault();
});

section.addEventListener("drop", (event) => {
  if (event.target.nodeName === "UL") {
    store.TodoList.updateTodo(store.selected, event.target.id);
    store.updateStore();
    statusManager.getToDos(store.TodoList.todos);
  }
});

section.addEventListener("dragstart", (event) => {
  store.updateStore({
    ...event.target.dataset,
    value: event.target.textContent,
  });
});

//수정버튼 -> 내용 수정하기 기능
