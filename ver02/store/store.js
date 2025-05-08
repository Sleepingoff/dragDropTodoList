import { addArray, filterArray, updateArray } from "../utils/array";

const TARGET = {
  TODO: "todos",
  CATEGORY: "categories",
};

//generate id
export function generateId() {
  //todo: uuid
  return Math.floor(Math.random() * 1000000);
}
//generate timestamp
export function generateTimestamp() {
  return new Date().getTime();
}
//check default category
export function checkDefaultCategory() {
  //getDefaultCategory
  return false;
}

//get store
export function getStore(target) {
  //get store from local storage
  const store = localStorage.getItem(target);
  //if store is null, return empty array
  if (store === null) {
    return [];
  }
  //parse store
  return JSON.parse(store);

  //TODO: api call by service
}

//set store
export function setStore(target, data) {
  //set store to local storage
  localStorage.setItem(target, JSON.stringify(data));
}
//get todos
export function getTodos() {
  //get todos from local storage
  const todos = getStore(TARGET.TODO);
  //return todos
  return todos;
}

//get todo
export function getTodoById(id) {
  //get todos from local storage
  const todos = getStore(TARGET.TODO);
  //find todo by id
  const todo = filterArray(todos, "id", id);
  //TODO: todo가 비어있을 경우는?
  //return todo
  return todo;
}

//add todos : 하나의 todo만 추가하는 것이기 때문에 단수로 변경
export function addTodo(todo) {
  //get todos from local storage
  const todos = getStore(TARGET.TODO);
  //push todo to todos array
  const newTodos = addArray(todos, todo);
  //set todos to local storage
  setStore(TARGET.TODO, newTodos);
}

//delete todos
export function deleteTodo(todo) {
  //get todos from local storage
  const todos = getStore(TARGET.TODO);
  //filter todos
  const newTodos = filterArray(todos, "id", todo.id);
  //set todos to local storage
  setStore(TARGET.TODO, newTodos);
}

//update todos
export function updateTodo(todo) {
  //get todos from local storage
  const todos = getStore(TARGET.TODO);
  //map todos
  const newTodos = updateArray(todos, "id", todo);
  //set todos to local storage
  setStore(TARGET.TODO, newTodos);
}

/**
 * category list
 */

//? todo list와 동일한 로직을 이용할지(TARGET.TODO를 인자로 넘기는 방식)
//? category list를 별도로 만드는 게 좋을지
//-> 현재는 두개 모두 동일하게 로컬 스토리지에 접근하지만, 추후에 api를 사용할 경우 둘의 로직은 분리되어 움직여야 한다.
//-> api를 사용할 경우 에러메세지 등을 처리할 때 분기처리가 될 수도 있다.
//! 일단 다른 데이터를 대상으로 하며, 스토어에 접근하는 액션 로직이 있으므로 별도로 만들자.

//get categories
export function getCategories() {
  const category = getStore(TARGET.CATEGORY);
  return category;
}

//get category by id
export function getCategoryById(id) {
  const categories = getStore(TARGET.CATEGORY);
  const category = filterArray(categories, "id", id);
  return category;
}

//add category: 하나의 카테고리만 추가하는 것이기 때문에 단수로 사용
export function addCategory(category) {
  const categories = getStore(TARGET.CATEGORY);
  const newCategories = addArray(categories, category);
  setStore(TARGET.CATEGORY, newCategories);
}

//update category
export function updateCategory(category) {
  const categories = getStore(TARGET.CATEGORY);
  //id를 기준으로 기존 카테고리 리스트에서 해당 내용을 찾아 덮어쓰기
  const newCategories = updateArray(categories, "id", category);
  setStore(TARGET.CATEGORY, newCategories);
}

//delete category
export function deleteCategory(category) {
  const categories = getStore(TARGET.CATEGORY);
  //id를 기준으로 기존 카테고리 리스트에서 해당 내용을 찾아 덮어쓰기
  const newCategories = filterArray(categories, "id", category.id);
  setStore(TARGET.CATEGORY, newCategories);
}
