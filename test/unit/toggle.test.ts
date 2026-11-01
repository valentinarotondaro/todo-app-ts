import { describe, it, expect, beforeEach } from 'vitest';
import { addTodo } from '../../src/todos';
import { toggleTodo } from '../../src/features/toggle';

describe('toggleTodo', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('marks a todo as completed', () => {
    const todo = addTodo('Buy milk');
    toggleTodo(todo.id);
    expect(todo.completed).toBe(true);
  });

  it('marks it as not completed when toggled twice', () => {
    const todo = addTodo('Walk the dog');
    toggleTodo(todo.id);
    toggleTodo(todo.id);
    expect(todo.completed).toBe(false);
  });

  it('returns undefined when the id does not exist', () => {
    expect(toggleTodo(-1)).toBeUndefined();
  });
});