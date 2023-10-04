import store from "./store.js";
import ToDoManager from "./ToDoManager.js";
import StatusManager from "./StatusManager.js";

const section = document.querySelector("section.wrap");

export { section };

const statusManger = new StatusManager();

const statusForm = document.querySelector("#status");
const statusInput = statusForm.querySelector("input");
const addBtn = statusForm.querySelector("#add-status");
const todoForm = document.querySelector("#todo");
const todoInput = todoForm.querySelector("input");
const deleteBtn = document.querySelector("#delete");

//기본 상태 제공하기
statusManger.paintStatus(`archive`);
statusManger.paintStatus(`progress`);
statusManger.paintStatus(`done`);
statusManger.createStatusList(`archive`);
statusManger.createStatusList(`progress`);
statusManger.createStatusList(`done`);

statusForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!statusInput.value) {
    alert("상태를 입력해주세요");
    return false;
  }
  const newStatus = statusInput.value;

  statusManger.updateStatus(newStatus);
  statusManger.paintStatus(newStatus);

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
  statusManger.getToDos(store.TodoList.todos);

  store.allToDo.childNodes.forEach((todo) => {
    todo.addEventListener("dragstart", (event) => {
      const selected = event.currentTarget;
      const selectedInfo = { ...selected.dataset, value: selected.textContent };
      store.updateStore(selectedInfo);
      statusManger.getToDos(store.TodoList.todos);
    });
  });
});

//할 일 삭제하기
deleteBtn.addEventListener("dragover", (e) => e.preventDefault());
deleteBtn.addEventListener("drop", () => {
  store.TodoList.deleteTodo(store.selected);
  store.TodoList.paintTodo();
  store.updateStore();
  statusManger.getToDos(store.TodoList.todos);
});

section.addEventListener("dragover", (event) => {
  event.preventDefault();
});

section.addEventListener("drop", (event) => {
  if (event.target.nodeName === "UL") {
    store.TodoList.updateTodo(store.selected, event.target.id);
    store.updateStore();
    statusManger.getToDos(store.TodoList.todos);
  }
});

section.addEventListener("dragstart", (event) => {
  store.updateStore({
    ...event.target.dataset,
    value: event.target.textContent,
  });
});

// const handleDoubleClickTodo = (event) => {
//   const valueManager = new ValueManager(event.currentTarget);
//   const dataset = valueManager.targetData;
//   valueManager.appendInput();

//   const newValue = valueManager.value;
//   TodoList.updateTodo({ ...dataset, todo: newValue });
//   statusManger.getToDos(TodoList.todos, handleDoubleClickTodo);
// };

//더블클릭 -> 인풋 생성 -> 인풋 블러 -> 값 가져오기
