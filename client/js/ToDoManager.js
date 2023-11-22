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
      const li = document.createElement("li");
      li.setAttribute("draggable", true);
      li.innerHTML = `${todo.value}`;
      li.dataset.key = `${todo.id}`;
      li.dataset.status = `${todo?.status}`;
      li.className = `${todo?.status}`;

      frag.append(li);
    });
    return frag;
  }
  updateTodo(todo, status) {
    const target = this.todos.find((elem) => todo?.key == elem.id);
    target.value = todo.value;
    target.setStatus(status ?? todo.status);
    this.paintTodo();
  }
  deleteTodo(todo) {
    console.log(todo);
    this.todos = this.todos.filter((elem) => elem.id != todo.key);
  }
}

export default ToDoManager;
