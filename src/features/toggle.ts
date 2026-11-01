import { todos } from '../todos';
import { saveTodos } from '../storage';
import type { Todo } from '../types';

/**
 * Switches a todo between completed and not completed.
 * @param id - The id of the todo to toggle.
 * @returns The updated todo, or undefined if the id does not exist.
 */
export const toggleTodo = (id: number): Todo | undefined => {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos(todos);
  }
  return todo;
};