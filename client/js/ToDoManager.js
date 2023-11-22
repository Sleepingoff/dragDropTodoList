import ToDo from "./ToDo.js";
import store from "./store.js";
class ToDoManager {
  constructor() {
    this.todos = [];
  }
  createTodo(newTodo) {
    const Todo = new ToDo(newTodo);
    this.todos = [...this.todos, Todo];
    return Todo;
  }
  paintTodo() {
    const frag = document.createDocumentFragment();
    //데이터에 맞게 리스트 새로 생성하기
    this.todos.forEach((todo) => {
      if (!todo.status) {
        const button = document.createElement("button");
        button.innerText = "수정";
        button.id = "edit";
        const li = document.createElement("li");
        li.setAttribute("draggable", true);
        li.innerHTML = `${todo.value}`;
        li.dataset.value = `${todo.value}`;
        li.dataset.key = `${todo.id}`;
        li.dataset.status = `${todo?.status}`;
        li.className = `${todo?.status}`;
        li.appendChild(button);

        frag.append(li);
      }
    });

    return frag;
  }
  updateTodo(todo, status) {
    const target = this.todos.find((elem) => todo?.key == elem.id);
    target.value = todo?.value ?? target.value;
    target.setStatus(status ?? todo.status);
    this.paintTodo();
  }
  deleteTodo(todo) {
    this.todos = this.todos.filter((elem) => elem.id != todo.key);
  }
}

export default ToDoManager;
