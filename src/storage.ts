import type { Todo } from './types';

// The key (name) we use to save the todos in localStorage.
const STORAGE_KEY = 'todos';

// Saves the list of todos in localStorage as text (JSON).
export const saveTodos = (todos: Todo[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// Loads the list of todos from localStorage.
// Returns an empty list if nothing is saved or the data is broken.
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
