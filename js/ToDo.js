/**
 * todo status: archive, progress, done
 * default: none;
 * **/
class ToDo {
  constructor(newTodo) {
    this.id = parseInt(Math.random(new Date()) * 100000);
    this.value = newTodo;
    this.status = "";
  }
  setStatus(status) {
    this.status = status;
  }
}

export default ToDo;
