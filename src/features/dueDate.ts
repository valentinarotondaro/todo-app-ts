import type { Todo, DueStatus } from '../types';

/**
 * Returns today's date as text in the format YYYY-MM-DD (local time).
 * Dates in this format can be compared like words in a dictionary.
 *
 * @returns Today's date, for example "2026-11-01".
 */
export const getToday = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

/**
 * Tells if a todo has no due date, is still on time, or is overdue.
 * A completed todo is never overdue, so there is nothing to warn about.
 *
 * @param todo - The todo to check.
 * @param today - Today's date as YYYY-MM-DD. Can be set in tests to get a fixed result.
 * @returns `'none'`, `'upcoming'` or `'overdue'`.
 */
export const getDueStatus = (todo: Todo, today: string = getToday()): DueStatus => {
  if (!todo.dueDate || todo.completed) {
    return 'none';
  }
  return todo.dueDate < today ? 'overdue' : 'upcoming';
};