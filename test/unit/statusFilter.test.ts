import { describe, it, expect } from 'vitest';
import { filterByStatus, countByStatus } from '../../src/features/statusFilter';
import type { Todo } from '../../src/types';

const todos: Todo[] = [
  { id: 1, text: 'Write report', completed: false },
  { id: 2, text: 'Call mum', completed: true },
  { id: 3, text: 'Water plants', completed: false },
];

describe('statusFilter', () => {
  it('filterByStatus returns every todo for "all"', () => {
    expect(filterByStatus(todos, 'all')).toHaveLength(3);
  });

  it('filterByStatus keeps only the open todos for "active"', () => {
    expect(filterByStatus(todos, 'active').map(todo => todo.id)).toEqual([1, 3]);
  });

  it('filterByStatus keeps only the done todos for "completed"', () => {
    expect(filterByStatus(todos, 'completed').map(todo => todo.id)).toEqual([2]);
  });

  it('countByStatus counts the todos of a status', () => {
    expect(countByStatus(todos, 'active')).toBe(2);
    expect(countByStatus(todos, 'completed')).toBe(1);
  });
});