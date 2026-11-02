import { describe, it, expect, beforeEach } from 'vitest';
import { filterByCategory, countByCategory } from '../../src/features/categories';
import { addTodo } from '../../src/todos';
import type { Todo } from '../../src/types';

const todos: Todo[] = [
  { id: 1, text: 'Write report', completed: false, category: 'work' },
  { id: 2, text: 'Call mum', completed: false, category: 'personal' },
  { id: 3, text: 'Send email', completed: true, category: 'work' },
];

describe('categories', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('filterByCategory keeps only the todos of that category', () => {
    expect(filterByCategory(todos, 'work').map(todo => todo.id)).toEqual([1, 3]);
  });

  it('filterByCategory returns every todo for "all"', () => {
    expect(filterByCategory(todos, 'all')).toHaveLength(3);
  });

  it('countByCategory counts the todos of a category', () => {
    expect(countByCategory(todos, 'work')).toBe(2);
    expect(countByCategory(todos, 'study')).toBe(0);
  });

  it('addTodo saves the category, with personal as default', () => {
    expect(addTodo('Read a book', undefined, 'study').category).toBe('study');
    expect(addTodo('Water plants').category).toBe('personal');
  });
    it('filterByCategory counts an old todo without category as personal', () => {
    const oldTodo: Todo = { id: 9, text: 'Old todo', completed: false };
    expect(filterByCategory([oldTodo], 'personal')).toHaveLength(1);
  });
});