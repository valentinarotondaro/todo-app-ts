// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest';
import { saveTodos, loadTodos, saveToStorage, loadFromStorage } from '../../src/storage';
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

describe('generic storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const isNumber = (data: unknown): data is number => typeof data === 'number';

  it('saveToStorage and loadFromStorage work with any type', () => {
    saveToStorage<number>('score', 42);
    expect(loadFromStorage<number>('score', 0, isNumber)).toBe(42);
  });

  it('loadFromStorage returns the fallback when nothing is saved', () => {
    expect(loadFromStorage<number>('score', 0, isNumber)).toBe(0);
  });

  it('loadFromStorage returns the fallback when the type is wrong', () => {
    localStorage.setItem('score', JSON.stringify('not a number'));
    expect(loadFromStorage<number>('score', 0, isNumber)).toBe(0);
  });
});