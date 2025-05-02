import { todos, categories } from "./data.js";

import {
  generateId,
  generateTimestamp,
  checkDefaultCategory,
  getStore,
  setStore,
  getTodos,
  getTodoById,
  addTodos,
  updateTodos,
  deleteTodos,
} from "./store.js";

export default {
  todos,
  categories,
  // Add other data objects as needed
  generateId,
  generateTimestamp,

  checkDefaultCategory,

  getStore,
  setStore,

  TODO: {
    getTodos,
    getTodoById,
    addTodos,
    updateTodos,
    deleteTodos,
  },
};
