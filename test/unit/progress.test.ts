import { describe, it, expect } from 'vitest';
import { getProgress } from '../../src/features/progress';
import type { Todo } from '../../src/types';

const makeTodo = (id: number, completed: boolean): Todo => ({ id, text: `Todo ${id}`, completed });

describe('getProgress', () => {
  it('returns 0% when there are no todos', () => {
    expect(getProgress([])).toEqual({ done: 0, total: 0, percent: 0 });
  });

  it('counts the done todos and rounds the percentage', () => {
    const todos = [makeTodo(1, true), makeTodo(2, false), makeTodo(3, false)];
    expect(getProgress(todos)).toEqual({ done: 1, total: 3, percent: 33 });
  });

  it('returns 100% when every todo is done', () => {
    const todos = [makeTodo(1, true), makeTodo(2, true)];
    expect(getProgress(todos).percent).toBe(100);
  });
});