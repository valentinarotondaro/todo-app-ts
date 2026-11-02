import type { Todo, Category, Priority } from './types';
import { loadTodos, saveTodos } from './storage';

/** The list of todos: the "state" of the app. It is loaded from localStorage when the app starts. */
export let todos: Todo[] = loadTodos();

/**
 * Creates a new todo, adds it to the list and saves the list.
 *
 * @param text - The text of the todo.
 * @param dueDate - Optional due date in the format YYYY-MM-DD.
 * @param category - The category. Default: `'personal'`.
 * @param priority - The priority. Default: `'medium'`.
 * @returns The new todo.
 */
export const addTodo = (text: string, dueDate?: string, category: Category = 'personal', priority: Priority = 'medium'): Todo => {
  const newTodo: Todo = {
    id: Date.now(), // Unique id based on the current timestamp
    text: text,
    completed: false,
    dueDate: dueDate,
    category: category,
    priority: priority,
  };
  todos.push(newTodo);
  saveTodos(todos);
  return newTodo;
};

/**
 * Removes the todo with the given id and saves the list.
 *
 * @param id - The id of the todo to remove.
 */
export const removeTodo = (id: number): void => {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos(todos);
};

/**
 * Changes the text of the todo with the given id and saves the list.
 *
 * @param id - The id of the todo to change.
 * @param text - The new text.
 */
export const editTodo = (id: number, text: string): void => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.text = text;
    saveTodos(todos);
  }
};