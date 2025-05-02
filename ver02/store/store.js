const store = {
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
  const todos = getStore(store.TODO);
  //return todos
  return todos;
}

//get todo
export function getTodoById(id) {
  //get todos from local storage
  const todos = getStore(store.TODO);
  //find todo by id
  const todo = todos.find((todo) => todo.id === id);
  //return todo
  return todo;
}

//add todos
export function addTodos(todo) {
  //get todos from local storage
  const todos = getStore(store.TODO);
  //push todo to todos array
  const newTodos = addArray(todos, todo);
  //set todos to local storage
  setStore(store.TODO, newTodos);
}

//delete todos
export function deleteTodos(todo) {
  //get todos from local storage
  const todos = getStore(store.TODO);
  //filter todos
  const newTodos = filterArray(todos, "id", todo.id);
  //set todos to local storage
  setStore(store.TODO, newTodos);
}

//update todos
export function updateTodos(todo) {
  //get todos from local storage
  const todos = getStore(store.TODO);
  //map todos
  const newTodos = updateArray(todos, "id", todo);
  //set todos to local storage
  setStore(store.TODO, newTodos);
}

//filter array
export function filterArray(array, key, value) {
  //filter array
  const newArray = array.filter((item) => item[key] === value);
  //return new array
  return newArray;
}

//update array
export function updateArray(array, key, value) {
  //map array
  const newArray = array.map((item) => {
    if (item[key] === value[key]) {
      return { ...item, ...value };
    }
    return item;
  });
  //return new array
  return newArray;
}

//나중에 순서를 바꾸는 등의 작업을 할 수 있도록 별도로 분리
//add array
export function addArray(array, value) {
  const newArray = [...array];
  //push value to array
  newArray.push(value);
  //return new array
  return newArray;
}

//switch order of array by index
export function switchArray(array, index1, index2) {
  const newArray = [...array];
  //switch order of array by index
  const temp = newArray[index1];
  newArray[index1] = newArray[index2];
  newArray[index2] = temp;
  //return new array
  return newArray;
}

//sort array by key
export function sortArray(array, key) {
  const newArray = [...array];
  //sort array by key
  newArray.sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    }
    if (a[key] > b[key]) {
      return 1;
    }
    return 0;
  });
  //return new array
  return newArray;
}
