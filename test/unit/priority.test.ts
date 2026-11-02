import { describe, it, expect } from 'vitest';
import { sortByPriority, getPriority } from '../../src/features/priority';
import type { Todo, Priority } from '../../src/types';

const makeTodo = (id: number, priority?: Priority): Todo => ({
  id,
  text: `Todo ${id}`,
  completed: false,
  priority,
});

describe('getPriority', () => {
  it('returns medium when the todo has no priority', () => {
    expect(getPriority(makeTodo(1))).toBe('medium');
  });
});

describe('sortByPriority', () => {
  it('puts high first, then medium, then low', () => {
    const todos = [makeTodo(1, 'low'), makeTodo(2, 'high'), makeTodo(3, 'medium')];
    expect(sortByPriority(todos).map(todo => todo.id)).toEqual([2, 3, 1]);
  });

  it('keeps the original order for todos with the same priority', () => {
    const todos = [makeTodo(1, 'high'), makeTodo(2, 'high'), makeTodo(3, 'high')];
    expect(sortByPriority(todos).map(todo => todo.id)).toEqual([1, 2, 3]);
  });

  it('does not change the original list', () => {
    const todos = [makeTodo(1, 'low'), makeTodo(2, 'high')];
    sortByPriority(todos);
    expect(todos.map(todo => todo.id)).toEqual([1, 2]);
  });
});
