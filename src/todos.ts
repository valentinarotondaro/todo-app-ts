import type { Todo } from './types';

// The list of todos. This is the "state" of the app.
export let todos: Todo[] = [];

// Creates a new todo and adds it to the list.
export const addTodo = (text: string): Todo => {
  const newTodo: Todo = {
    id: Date.now(), // Unique id based on the current timestamp
    text: text,
    completed: false,
  };
  todos.push(newTodo);
  return newTodo;
};

// Removes the todo with the given id.
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
};

// Changes the text of the todo with the given id.
export const editTodo = (id: number, text: string): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.text = text;
  }
};