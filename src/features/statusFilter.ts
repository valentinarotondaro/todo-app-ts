import type { Todo } from '../types';

/** What the list can be filtered by: every todo, only open ones, or only done ones. */
export type StatusFilter = 'all' | 'active' | 'completed';

/** All status filters, in the order they are shown. */
export const STATUSES: StatusFilter[] = ['all', 'active', 'completed'];

// The status tab that is selected right now.
let activeStatus: StatusFilter = 'all';

/** @returns The status tab that is selected right now. */
export const getActiveStatus = (): StatusFilter => activeStatus;

/**
 * Changes the selected status tab.
 * @param status - 'all', 'active' or 'completed'.
 */
export const setActiveStatus = (status: StatusFilter): void => {
  activeStatus = status;
};

/**
 * Returns only the todos with the chosen status.
 * @param todos - The list of todos.
 * @param status - 'all' keeps every todo, 'active' the open ones, 'completed' the done ones.
 * @returns A new filtered list (the original list is not changed).
 */
export const filterByStatus = (todos: Todo[], status: StatusFilter): Todo[] => {
  if (status === 'all') return todos;
  return todos.filter(todo => (status === 'completed' ? todo.completed : !todo.completed));
};

/**
 * Counts the todos with a status.
 * @param todos - The list of todos.
 * @param status - 'all', 'active' or 'completed'.
 * @returns The number of todos.
 */
export const countByStatus = (todos: Todo[], status: StatusFilter): number =>
  filterByStatus(todos, status).length;