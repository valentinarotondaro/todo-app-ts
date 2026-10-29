// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { saveTodos, loadTodos } from '../../src/storage';
import type { Todo } from '../../src/types';

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loadTodos returns an empty list when nothing is saved', () => {
    expect(loadTodos()).toEqual([]);
  });

  it('saveTodos and loadTodos keep the same todos', () => {
    const todos: Todo[] = [{ id: 1, text: 'Buy milk', completed: false }];
    saveTodos(todos);
    expect(loadTodos()).toEqual(todos);
  });

  it('loadTodos returns an empty list when the data is broken', () => {
    localStorage.setItem('todos', 'not json');
    expect(loadTodos()).toEqual([]);
  });
});
