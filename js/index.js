import Store from "./store.js";
import ToDo from "./ToDo.js";
import ToDoManager from "./ToDoManager.js";
import Status from "./Status.js";
import StatusManger from "./StatusManager.js";

const statusBtn = document.querySelector("ul.status-btns");
const section = document.querySelector("section.wrap");

export { section };

const store = new Store();
const TodoList = new ToDoManager();
const statusManger = new StatusManger();

const statusForm = document.querySelector("#status");
const statusInput = statusForm.querySelector("input");
const addBtn = statusForm.querySelector("#add-status");
const todoForm = document.querySelector("#todo");
const todoInput = todoForm.querySelector("input");
const deleteBtn = document.querySelector("#delete");

statusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!statusInput.value) {
    alert("상태를 입력해주세요");
    return false;
  }
  const newStatus = statusInput.value;

  statusManger.updateStatus(newStatus);
  statusBtn.append(statusManger.paintStatus(newStatus));

  statusInput.value = "";
});

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!todoInput.value) {
    alert("할 일을 입력해주세요");
    return false;
  }
  //새로운 할 일을 생성
  TodoList.createTodo(todoInput.value);
  todoInput.value = "";

  //할 일 목록을 읽어오기
  TodoList.paintTodo();
  store.updateStore();
});

//4차 할 일 삭제하기
deleteBtn.addEventListener("dragover", (e) => e.preventDefault());
deleteBtn.addEventListener("drop", () => {
  TodoList.deleteTodo(store.selected);
  TodoList.paintTodo();
  store.updateStore();
  statusManger.paintStatus();
});

store.todos.childNodes.forEach((todo) => {
  todo.addEventListener("dragstart", (event) => {
    store.updateStore(event.currentTarget);
  });
});

section.addEventListener("dragover", (e) => e.preventDefault());

section.addEventListener("drop", () => {
  todoList = TodoList.paintTodo();
  paintStatus();
});

this.list.addEventListener("dragstart", (event) => {
  selected = event.target;
});
this.list.addEventListener("dragover", () => {
  TodoList.updateTodo(selected, archive.id);
});

this.list.removeEventListener("dragstart", (event) => {
  selected = event.target;
});
this.list.addEventListener("dragover", () => {
  TodoList.updateTodo(selected, archive.id);
});
