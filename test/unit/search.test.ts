import { describe, it, expect } from 'vitest';
import { filterBySearch } from '../../src/features/search';
import type { Todo } from '../../src/types';

const todos: Todo[] = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Write report', completed: true },
  { id: 3, text: 'Buy chocolate', completed: false },
];

describe('search', () => {
  it('filterBySearch keeps every todo when the search is empty', () => {
    expect(filterBySearch(todos, '   ')).toHaveLength(3);
  });

  it('filterBySearch keeps only the todos that contain the text', () => {
    expect(filterBySearch(todos, 'buy').map(todo => todo.id)).toEqual([1, 3]);
  });

  it('filterBySearch ignores upper and lower case', () => {
    expect(filterBySearch(todos, 'REPORT').map(todo => todo.id)).toEqual([2]);
  });
});