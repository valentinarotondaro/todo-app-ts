import type { Todo } from '../types';

/** The maximum number of characters a todo can have. */
export const MAX_TODO_LENGTH = 100;

/**
 * The result of validating a todo text (union type).
 * When `valid` is `false`, TypeScript knows that `message` exists (narrowing).
 */
export type ValidationResult =
  | { valid: true }
  | { valid: false; message: string };

/**
 * Checks the text of a new todo before it is added.
 * Rules: not empty, at most `MAX_TODO_LENGTH` characters, and no duplicates (case-insensitive).
 *
 * @param text - The text the user typed.
 * @param todos - The current list, used to find duplicates.
 * @returns `{ valid: true }`, or `{ valid: false, message }` with the reason.
 */
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
