import type { Todo } from './types';
import { loadTodos, saveTodos } from './storage';
// The list of todos. This is the "state" of the app.
export let todos: Todo[] = loadTodos();

// Creates a new todo and adds it to the list.
// dueDate is optional: a todo can have no due date.
export const addTodo = (text: string, dueDate?: string): Todo => {
  const newTodo: Todo = {
    id: Date.now(), // Unique id based on the current timestamp
    text: text,
    completed: false,
    dueDate: dueDate,
  };
  todos.push(newTodo);
    saveTodos(todos);
  return newTodo;
};

// Removes the todo with the given id.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
    saveTodos(todos);
};

// Changes the text of the todo with the given id.
export const editTodo = (id: number, text: string): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.text = text;
      saveTodos(todos);
  }
};