//Import dom elements
import {
  todoForm,
  categoryForm,
  todoList,
  categoryList,
} from "../view/index.js";
import { getCurrentVersion } from "../service/index.js";
import { addTodos } from "../store/index.js";
//change todo style by active

//register todo list

//input todo, category
//check if string input is empty
function checkInputIsEmpty(input) {
  if (input === "") {
    return true;
  }
  return false;
}

//check dom element
function checkDomElement(element) {
  if (element === null) {
    return true;
  }
  return false;
}

//event handler: form submit

//create todo
if (checkDomElement(todoForm)) {
  todoForm.addEventListener("submit", handleSubmitToCreateTodo);
}
function handleSubmitToCreateTodo(e) {
  e.preventDefault();
  //get input value
  const formData = new FormData(e.target);
  const todo = formData.get("todo");
  //check if input is empty
  if (checkInputIsEmpty(todo)) {
    //alert user if input is empty
    alert("Please enter a todo");
    return;
  }
  //create todo object
  const todoObject = createNewTodo(todo);
  //push todo object to todos array
  addTodos(todoObject);
  //render todo list
  renderTodoList();
  //clear input value
  todoForm.reset();
}

//? move to store
function createNewTodo(todo) {
  const version = getCurrentVersion();
  const id = generateId();
  const timestamp = generateTimestamp();
  //TODO: get current selected category
  const category = getDefaultCategory();
  return {
    version,
    id,
    timestamp,
    todo: todo,
    active: true,
    category_id: category.id,
  };
}
