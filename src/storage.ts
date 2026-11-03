import type { Todo } from './types';

/** The key (name) used to save the todos in localStorage. */
const STORAGE_KEY = 'todos';
/**
 * Saves any value in localStorage as JSON.
 * Generic: `T` is the type of the value, so the same function works for todos, the theme or anything else.
 *
 * @param key - The name to save the value under.
 * @param value - The value to save.
 */
export const saveToStorage = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Loads a value from localStorage and checks that it has the right type.
 * Generic: the caller says which type `T` it expects and how to check it.
 *
 * @param key - The name the value was saved under.
 * @param fallback - The value to return if nothing is saved or the data is broken.
 * @param isValid - A type guard that checks the loaded data really is a `T`.
 * @returns The saved value, or the fallback.
 */
export const loadFromStorage = <T>(key: string, fallback: T, isValid: (data: unknown) => data is T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    return fallback;
  }
  try {
    const parsed: unknown = JSON.parse(data);
    return isValid(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
};

/** Type guard: true when the data is a list (the saved todos). */
const isTodoList = (data: unknown): data is Todo[] => Array.isArray(data);

/**
 * Saves the list of todos in localStorage.
 *
 * @param todos - The list of todos to save.
 */
export const saveTodos = (todos: Todo[]): void => saveToStorage<Todo[]>(STORAGE_KEY, todos);

/**
 * Loads the list of todos from localStorage.
 *
 * @returns The saved todos, or an empty list if nothing is saved or the data is broken.
 */
export const loadTodos = (): Todo[] => loadFromStorage<Todo[]>(STORAGE_KEY, [], isTodoList);