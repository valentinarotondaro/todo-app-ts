import { describe, it, expect } from 'vitest';
import { validateTodoText, MAX_TODO_LENGTH } from '../../src/features/validation';
import type { Todo } from '../../src/types';

const todos: Todo[] = [{ id: 1, text: 'Buy milk', completed: false }];

describe('validateTodoText', () => {
  it('rejects an empty text', () => {
    expect(validateTodoText('   ', todos).valid).toBe(false);
  });

  it('rejects a text that is too long', () => {
    expect(validateTodoText('a'.repeat(MAX_TODO_LENGTH + 1), todos).valid).toBe(false);
  });

  it('rejects a duplicate todo, ignoring upper and lower case', () => {
    expect(validateTodoText('buy MILK', todos).valid).toBe(false);
  });

  it('accepts a new valid todo', () => {
    expect(validateTodoText('Walk the dog', todos)).toEqual({ valid: true });
  });
});
