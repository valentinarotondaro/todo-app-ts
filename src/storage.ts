import type { Todo } from './types';

/** The key (name) used to save the todos in localStorage. */
const STORAGE_KEY = 'todos';

/**
 * Saves the list of todos in localStorage.
 * localStorage can only store text, so the list is turned into JSON first.
 *
 * @param todos - The list of todos to save.
 */
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

/**
 * Loads the list of todos from localStorage.
 *
 * @returns The saved todos, or an empty list if nothing is saved or the data is broken.
 */
export const loadTodos = (): Todo[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    return [];
  }
  try {
    const parsed: unknown = JSON.parse(data);
    return Array.isArray(parsed) ? (parsed as Todo[]) : [];
  } catch {
    return [];
  }
};