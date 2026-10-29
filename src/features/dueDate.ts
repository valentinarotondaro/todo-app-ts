import type { Todo, DueStatus } from '../types';

// Returns today's date as text in the format YYYY-MM-DD (local time).
export const getToday = (): string => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
};

// Tells if a todo has no due date, is still on time, or is overdue.
// A completed todo is never overdue, so there is nothing to warn about.
export const getDueStatus = (todo: Todo, today: string = getToday()): DueStatus => {
  if (!todo.dueDate || todo.completed) {
    return 'none';
  }
  return todo.dueDate < today ? 'overdue' : 'upcoming';
};
