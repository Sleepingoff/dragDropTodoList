//DOM selector
const FORM = {
  TODO: "todo",
  CATEGORY: "category",
};

const TODO_LIST_ID = "todo-list";
const CATEGORY_LIST_ID = "category-list";

const todoForm = document.getElementById(FORM.TODO);
const categoryForm = document.getElementById(FORM.CATEGORY);
const todoList = document.getElementById(TODO_LIST_ID);
const categoryList = document.getElementById(CATEGORY_LIST_ID);

const TODO_ELEMENT = (todo) => `
  <li class="todo-item" id="${todo.id}">
    <input type="checkbox" class="todo-checkbox"  ${
      todo.active ? "checked" : ""
    }>
    <span class="todo-text">${todo.todo}</span>
    <button class="todo-delete">Delete</button>
  </li>`;

export default {
  todoForm,
  categoryForm,
  todoList,
  categoryList,

  ELEMENT: {
    TODO: TODO_ELEMENT,
  },
};
