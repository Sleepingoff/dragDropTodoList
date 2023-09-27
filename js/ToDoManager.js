import ToDo from "./ToDo.js";
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
    this.todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.setAttribute("draggable", true);
      li.innerHTML = `${todo.todo}`;
      li.dataset.key = `${todo.id}`;
      li.dataset.status = `${todo?.status}`;
      li.className = `${todo?.status}`;

      frag.append(li);
    });

    return frag;
  }
  updateTodo(todo, status) {
    const target = this.todos.find((elem) => todo?.dataset.key == elem.id);
    target.todo = todo.innerText;
    target.setStatus(status ?? todo.dataset.status);
  }
  deleteTodo(todo) {
    this.todos = this.todos.filter((elem) => elem.id != todo.dataset.key);
  }
}

export default ToDoManager;
