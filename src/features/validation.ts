import type { Todo } from '../types';

export const MAX_TODO_LENGTH = 100;

// The result is either valid, or invalid with a message (union type).
export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };

// Checks the text of a new todo before it is added.
export const validateTodoText = (text: string, todos: Todo[]): ValidationResult => {
  const trimmed = text.trim();
  if (trimmed === '') {
    return { valid: false, message: 'Please enter a todo item' };
  }
  if (trimmed.length > MAX_TODO_LENGTH) {
    return { valid: false, message: `A todo can have at most ${MAX_TODO_LENGTH} characters` };
  }
  const exists = todos.some(todo => todo.text.toLowerCase() === trimmed.toLowerCase());
  if (exists) {
    return { valid: false, message: 'This todo already exists' };
  }
  return { valid: true };
};
