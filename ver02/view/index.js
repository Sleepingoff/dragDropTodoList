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

export default {
  todoForm,
  categoryForm,
  todoList,
  categoryList,
};
