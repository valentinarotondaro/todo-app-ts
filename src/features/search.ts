import type { Todo } from '../types';

// The text typed in the search field right now.
let searchQuery = '';

/** @returns The text typed in the search field right now. */
export const getSearchQuery = (): string => searchQuery;

/**
 * Changes the search text.
 * @param query - The text typed by the user.
 */
export const setSearchQuery = (query: string): void => {
  searchQuery = query;
};

/**
 * Returns only the todos whose text contains the search text.
 * Upper and lower case don't matter, and spaces around the text are ignored.
 *
 * @param todos - The list of todos.
 * @param query - The search text. An empty text keeps every todo.
 * @returns A new filtered list (the original list is not changed).
 */
export const filterBySearch = (todos: Todo[], query: string): Todo[] => {
  const text = query.trim().toLowerCase();
  if (text === '') return todos;
  return todos.filter(todo => todo.text.toLowerCase().includes(text));
};