import type { Todo } from '../types';

/** How many todos are done, out of how many, and the percentage. */
export interface Progress {
  done: number;
  total: number;
  percent: number;
}

/**
 * Calculates the progress of a list of todos.
 * @param todos - The list of todos.
 * @returns The number of done todos, the total and the percentage (0–100, rounded).
 */
export const getProgress = (todos: Todo[]): Progress => {
  const total = todos.length;
  const done = todos.filter(todo => todo.completed).length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
};