import type { Todo, Category } from '../types';

/** All categories, in the order they are shown. */
export const CATEGORIES: Category[] = ['work', 'personal', 'study', 'home'];

/** What the list can be filtered by: one category, or all of them. */
export type CategoryFilter = 'all' | Category;

// The filter tab that is selected right now.
let activeFilter: CategoryFilter = 'all';

/** @returns The filter tab that is selected right now. */
export const getActiveCategory = (): CategoryFilter => activeFilter;

/**
 * Changes the selected filter tab.
 * @param filter - A category, or 'all'.
 */
export const setActiveCategory = (filter: CategoryFilter): void => {
  activeFilter = filter;
};

/**
 * Returns only the todos of the chosen category.
 * @param todos - The full list of todos.
 * @param filter - A category, or 'all' to keep every todo.
 * @returns A new filtered list (the original list is not changed).
 */
export const filterByCategory = (todos: Todo[], filter: CategoryFilter): Todo[] =>
  filter === 'all' ? todos : todos.filter(todo => (todo.category ?? 'personal') === filter);
/**
 * Counts the todos in a category.
 * @param todos - The full list of todos.
 * @param filter - A category, or 'all' to count every todo.
 * @returns The number of todos.
 */
export const countByCategory = (todos: Todo[], filter: CategoryFilter): number =>
  filterByCategory(todos, filter).length;